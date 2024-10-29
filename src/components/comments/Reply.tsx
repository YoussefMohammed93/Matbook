import Link from "next/link";
import { useState } from "react";
import UserAvatar from "../UserAvatar";
import { ReplyData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";

interface ReplyProps {
  reply: ReplyData;
  onDelete: () => void;
}

export default function Reply({ reply, onDelete }: ReplyProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    if (!showDeleteDialog) {
      setShowDeleteDialog(true);
    }
  };

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false);
  };

  const handleConfirmDelete = () => {
    onDelete();
    closeDeleteDialog();
  };

  return (
    <div className="flex gap-3">
      <Link href={`/users/${reply.user.username}`}>
        <UserAvatar avatarUrl={reply.user.avatarUrl} size={32} />
      </Link>
      <div className="flex-1 rounded-md border bg-accent p-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/users/${reply.user.username}`}
            className="font-semibold hover:underline"
          >
            {reply.user.displayName}
          </Link>
          <span className="text-xs text-muted-foreground">
            {formatRelativeDate(new Date(reply.createdAt))}
          </span>
        </div>
        <p className="mt-1 text-sm sm:mt-0">{reply.content}</p>
        <button
          className="mt-2 text-sm text-red-600 hover:underline"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
