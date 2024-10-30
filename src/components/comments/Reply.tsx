import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";
import { ReplyData } from "@/lib/types";
import { formatRelativeDate } from "@/lib/utils";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { useSession } from "@/app/(main)/SessionProvider";

interface ReplyProps {
  reply: ReplyData;
  onRequestDelete: () => void;
  originalCommenter: { username: string; displayName: string };
}

export default function Reply({
  reply,
  onRequestDelete,
  originalCommenter,
}: ReplyProps) {
  const { user } = useSession();

  return (
    <div className="flex gap-3">
      <Link href={`/users/${reply.user.username}`}>
        <UserAvatar avatarUrl={reply.user.avatarUrl} size={32} />
      </Link>
      <div className="flex-1 rounded-md border bg-accent p-3">
        <div className="flex items-start justify-between sm:block">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <Link
              href={`/users/${reply.user.username}`}
              className="font-semibold hover:underline"
            >
              {reply.user.displayName}
            </Link>
            <span className="w-full min-w-32 text-xs text-muted-foreground">
              {formatRelativeDate(new Date(reply.createdAt))}
            </span>
            {user?.id === reply.userId && (
              <div className="hidden w-full justify-end sm:flex">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <MoreHorizontal className="size-5 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={onRequestDelete}>
                      <span className="flex items-center gap-3 text-destructive">
                        <Trash2 className="size-4" />
                        Delete
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
          {user?.id === reply.userId && (
            <div className="flex w-full justify-end sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <MoreHorizontal className="size-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={onRequestDelete}>
                    <span className="flex items-center gap-3 text-destructive">
                      <Trash2 className="size-4" />
                      Delete
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
        <p className="mt-1 flex items-center gap-2 text-sm sm:mt-0">
          <Link href={`/users/${originalCommenter.username}`}>
            <span className="font-semibold text-primary hover:underline">
              @{originalCommenter.displayName}
            </span>
          </Link>
          {reply.content}
        </p>
      </div>
    </div>
  );
}
