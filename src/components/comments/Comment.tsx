import Link from "next/link";
import { useState } from "react";
import ReplyForm from "./reply-form";
import ReplyList from "./reply-list";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";
import LikeButton from "./like-button";
import { formatRelativeDate } from "@/lib/utils";
import CommentMoreButton from "./CommentMoreButton";
import { CommentData, ReplyData } from "@/lib/types";
import { useSession } from "@/app/(main)/SessionProvider";

interface CommentProps {
  comment: CommentData;
}

export default function Comment({ comment }: CommentProps) {
  const { user } = useSession();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replies, setReplies] = useState<ReplyData[]>([]);
  const [replyCount, setReplyCount] = useState(comment._count.replies);

  const toggleReplyForm = () => setShowReplyForm((prev) => !prev);

  const addReply = (newReply: ReplyData) => {
    setReplies((prev) => [...prev, newReply]);
    setReplyCount((prevCount) => prevCount + 1);
  };

  const deleteReply = (replyId: string) => {
    setReplies((prev) => prev.filter((reply) => reply.id !== replyId));
    setReplyCount((prevCount) => prevCount - 1);
  };

  return (
    <div className="mb-2 flex w-full flex-col gap-3 rounded-md border bg-card p-3">
      <div className="flex items-start gap-3">
        <Link href={`/users/${comment.user.username}`}>
          <UserAvatar avatarUrl={comment.user.avatarUrl} size={40} />
        </Link>
        <div className="flex-1">
          <div className="flex items-start justify-between sm:block">
            <div className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-2">
              <Link
                href={`/users/${comment.user.username}`}
                className="font-semibold hover:underline"
              >
                {comment.user.displayName}
              </Link>
              <span className="w-full min-w-32 text-xs text-muted-foreground">
                {formatRelativeDate(comment.createdAt)}
              </span>
              {user?.id === comment.userId && (
                <div className="hidden w-full justify-end sm:flex">
                  <CommentMoreButton comment={comment} />
                </div>
              )}
            </div>
            {user?.id === comment.userId && (
              <div className="flex w-full justify-end sm:hidden">
                <CommentMoreButton comment={comment} />
              </div>
            )}
          </div>
          <div className="mt-1">{comment.content}</div>
          <div className="mt-2 flex items-center gap-2">
            <LikeButton
              commentId={comment.id}
              initialLikeCount={comment._count.likes}
              isInitiallyLiked={comment.likes.some(
                (like) => like.userId === user?.id,
              )}
            />
            <Button variant="link" onClick={toggleReplyForm}>
              {replyCount > 0 ? `Replies ( ${replyCount} )` : "Reply"}
            </Button>
          </div>
        </div>
      </div>

      {showReplyForm && (
        <div className="w-full sm:pl-12">
          <ReplyForm commentId={comment.id} onNewReply={addReply} />
          <ReplyList
            commentId={comment.id}
            comment={comment}
            replies={replies}
            onDeleteReply={deleteReply}
          />
        </div>
      )}
    </div>
  );
}
