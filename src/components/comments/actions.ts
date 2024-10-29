"use server";

import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { createCommentSchema, createReplySchema } from "@/lib/validation";
import { getCommentDataInclude, PostData } from "@/lib/types";

export async function submitComment({
  post,
  content,
}: {
  post: PostData;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: contentValidated } = createCommentSchema.parse({ content });

  const [newComment] = await prisma.$transaction([
    prisma.comment.create({
      data: {
        content: contentValidated,
        postId: post.id,
        userId: user.id,
      },
      include: getCommentDataInclude(user.id),
    }),
    ...(post.user.id !== user.id
      ? [
          prisma.notification.create({
            data: {
              issuerId: user.id,
              recipientId: post.user.id,
              postId: post.id,
              type: "COMMENT",
            },
          }),
        ]
      : []),
  ]);

  return newComment;
}

export async function deleteComment(id: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const comment = await prisma.comment.findUnique({
    where: { id },
  });

  if (!comment) throw new Error("Comment not found");

  if (comment.userId !== user.id) throw new Error("Unauthorized");

  const deletedComment = await prisma.comment.delete({
    where: { id },
    include: getCommentDataInclude(user.id),
  });

  return deletedComment;
}

export async function submitReply({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content: validatedContent } = createReplySchema.parse({ content });

  const newReply = await prisma.reply.create({
    data: {
      content: validatedContent,
      commentId,
      userId: user.id,
    },
    include: {
      user: true,
    },
  });

  return newReply;
}

export async function deleteReply(replyId: string) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const reply = await prisma.reply.findUnique({
    where: { id: replyId },
  });

  if (!reply) throw new Error("Reply not found");

  if (reply.userId !== user.id) throw new Error("Unauthorized");

  const deletedReply = await prisma.reply.delete({
    where: { id: replyId },
  });

  return deletedReply;
}
