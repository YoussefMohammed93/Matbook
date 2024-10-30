import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";
import { ReplyData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { MoreHorizontal, Trash2 } from "lucide-react";

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
          <span className="w-full text-xs text-muted-foreground">
            {formatRelativeDate(new Date(reply.createdAt))}
          </span>
          <div className="flex w-full justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="size-5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={onDelete}>
                  <span className="flex items-center gap-3 text-destructive">
                    <Trash2 className="size-4" />
                    Delete
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <p className="mt-1 text-sm sm:mt-0">{reply.content}</p>
      </div>
    </div>
  );
}
