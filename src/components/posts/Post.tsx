"use client";

import Link from "next/link";
import Image from "next/image";
import Linkify from "../Linkify";
import LikeButton from "./LikeButton";
import UserAvatar from "../UserAvatar";
import { PostData } from "@/lib/types";
import { Media } from "@prisma/client";
import UserTooltip from "../UserTooltip";
import Comments from "../comments/Comments";
import { MessageSquare } from "lucide-react";
import BookmarkButton from "./BookmarkButton";
import PostMoreButton from "./PostMoreButton";
import { cn, formatRelativeDate } from "@/lib/utils";
import { useSession } from "@/app/(main)/SessionProvider";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  const { user } = useSession();

  return (
    <article className="group/post space-y-3 rounded-md border bg-card p-5 shadow-sm">
      <div className="flex justify-between gap-3">
        <div className="flex flex-wrap gap-3">
          <UserTooltip user={post.user}>
            <Link href={`/users/${post.user.username}`}>
              <UserAvatar avatarUrl={post.user.avatarUrl} />
            </Link>
          </UserTooltip>
          <div>
            <UserTooltip user={post.user}>
              <Link
                href={`/users/${post.user.username}`}
                className="block font-medium hover:underline"
              >
                {post.user.displayName}
              </Link>
            </UserTooltip>
            <Link
              href={`/posts/${post.id}`}
              className="block text-sm text-muted-foreground hover:underline"
              suppressHydrationWarning
            >
              {formatRelativeDate(post.createdAt)}
            </Link>
          </div>
        </div>
        {post.user.id === user.id && (
          <PostMoreButton
            post={post}
            className="opacity-0 transition-opacity group-hover/post:opacity-100"
          />
        )}
      </div>
      <Linkify>
        <div className="whitespace-pre-line break-words">{post.content}</div>
      </Linkify>
      {!!post.attachments.length && (
        <MediaPreviews attachments={post.attachments} />
      )}
      <hr className="text-muted-foreground" />
      <div className="flex justify-between gap-5">
        <div className="flex items-center gap-5">
          <LikeButton
            postId={post.id}
            initialState={{
              likes: post._count.likes,
              isLikedByUser: post.likes.some((like) => like.userId === user.id),
            }}
          />
          <CommentButton post={post} />
        </div>
        <BookmarkButton
          postId={post.id}
          initialState={{
            isBookmarkedByUser: post.bookmarks.some(
              (bookmark) => bookmark.userId === user.id,
            ),
          }}
        />
      </div>
    </article>
  );
}

interface MediaPreviewsProps {
  attachments: Media[];
}

function MediaPreviews({ attachments }: MediaPreviewsProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        attachments.length > 1 && "sm:grid sm:grid-cols-2",
      )}
    >
      {attachments.map((m) => (
        <MediaPreview key={m.id} media={m} />
      ))}
    </div>
  );
}

interface MediaPreviewProps {
  media: Media;
}

function MediaPreview({ media }: MediaPreviewProps) {
  if (media.type === "IMAGE") {
    return (
      <Image
        src={media.url}
        alt="Attachment"
        width={500}
        height={500}
        className="mx-auto size-fit max-h-[30rem] rounded-2xl"
      />
    );
  }

  if (media.type === "VIDEO") {
    return (
      <div>
        <video
          src={media.url}
          controls
          className="mx-auto size-fit max-h-[30rem] rounded-2xl"
        />
      </div>
    );
  }

  return <p className="text-destructive">Unsupported media type</p>;
}

interface CommentButtonProps {
  post: PostData;
}

function CommentButton({ post }: CommentButtonProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2">
          <MessageSquare className="size-5" />
          <span className="text-sm font-medium tabular-nums">
            {post._count.comments} <span className="inline">comments</span>
          </span>
        </button>
      </DialogTrigger>
      <DialogContent
        className="scrollbar-thumb-green post-dialog max-h-[90vh] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <DialogHeader>
          <DialogTitle className="text-center">
            <span className="text-xl font-semibold">
              {post.user.displayName}
            </span>
            &#39;s post
          </DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-4">
          <article className="space-y-3 rounded-md border bg-card p-4 shadow-sm">
            <div className="flex justify-between gap-3">
              <div className="flex flex-wrap gap-3">
                <UserTooltip user={post.user}>
                  <Link href={`/users/${post.user.username}`}>
                    <UserAvatar avatarUrl={post.user.avatarUrl} />
                  </Link>
                </UserTooltip>
                <div>
                  <UserTooltip user={post.user}>
                    <Link
                      href={`/users/${post.user.username}`}
                      className="block font-medium hover:underline"
                    >
                      {post.user.displayName}
                    </Link>
                  </UserTooltip>
                  <span className="block text-sm text-muted-foreground">
                    {formatRelativeDate(post.createdAt)}
                  </span>
                </div>
              </div>
            </div>
            <Linkify>
              <div className="whitespace-pre-line break-words">
                {post.content}
              </div>
            </Linkify>
            {!!post.attachments.length && (
              <MediaPreviews attachments={post.attachments} />
            )}
          </article>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Comments</h3>
            <Comments post={post} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
