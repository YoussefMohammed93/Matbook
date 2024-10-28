import Link from "next/link";
import LikeButton from "./like-button";
import UserAvatar from "../UserAvatar";
import { CommentData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import CommentMoreButton from "./CommentMoreButton";
import { useSession } from "@/app/(main)/SessionProvider";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession();

  return (
    <div className="group/comment mb-2 flex gap-3 rounded-md border bg-secondary p-3">
      <span className="inline">
        <Link href={`/users/${comment.user.username}`}>
          <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
        </Link>
      </span>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-sm">
          <Link
            href={`/users/${comment.user.username}`}
            className="text-base font-semibold hover:underline"
          >
            {comment.user.displayName}
          </Link>
          <span className="text-muted-foreground text-xs sm:text-sm">
            {formatRelativeDate(comment.createdAt)}
          </span>
        </div>
        <div className="mt-1">{comment.content}</div>
        <LikeButton
          commentId={comment.id}
          initialLikeCount={comment._count.likes}
          isInitiallyLiked={comment.likes.some(
            (like) => like.userId === user?.id,
          )}
        />
      </div>
      {comment.user.id === user.id && (
        <CommentMoreButton
          comment={comment}
          className="ms-auto opacity-0 transition-opacity group-hover/comment:opacity-100"
        />
      )}
    </div>
  );
}
