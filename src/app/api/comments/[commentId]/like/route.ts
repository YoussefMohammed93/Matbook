import prisma from "@/lib/prisma";
import { validateRequest } from "@/auth";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params: { commentId } }: { params: { commentId: string } },
) {
  try {
    const { user } = await validateRequest();

    if (!user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const existingLike = await prisma.commentLike.findUnique({
      where: {
        commentId_userId: {
          commentId,
          userId: user.id,
        },
      },
    });

    if (existingLike) {
      await prisma.commentLike.delete({
        where: {
          commentId_userId: {
            commentId,
            userId: user.id,
          },
        },
      });
      return new Response(JSON.stringify({ message: "Like removed" }), {
        status: 200,
      });
    }

    const like = await prisma.commentLike.create({
      data: {
        commentId,
        userId: user.id,
      },
    });

    return new Response(JSON.stringify(like), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
