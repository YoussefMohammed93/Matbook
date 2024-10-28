import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import kyInstance from "@/lib/ky";
import { Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface LikesDialogProps {
  postId: string;
  likesCount: number;
}

export default function LikesDialog({ postId, likesCount }: LikesDialogProps) {
  const [showAll, setShowAll] = useState(false);

  const {
    data: likedUsers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["liked-users", postId],
    queryFn: () =>
      kyInstance
        .get(`/api/posts/${postId}/liked-users`)
        .json<{ username: string; displayName: string; avatarUrl: string }[]>(),
  });

  if (isLoading) return <Loader2 className="size-5 animate-spin" />;
  if (error) return <p>Failed to load liked users.</p>;

  const visibleUsers = showAll ? likedUsers : likedUsers?.slice(0, 3);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="text-sm font-medium tabular-nums">
          {likesCount} <span className="inline">likes</span>
        </button>
      </DialogTrigger>

      <DialogContent className="scrollbar-thumb-green max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Users who liked this post</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-2">
          {visibleUsers && visibleUsers.length > 0 ? (
            visibleUsers.map((user, index) => (
              <div
                key={user.username}
                className={`flex items-center gap-2 py-3 ${
                  index < visibleUsers.length - 1 ? "border-b" : ""
                }`}
              >
                <Link href={`/users/${user.username}`} passHref>
                  <Image
                    src={user.avatarUrl || avatarPlaceholder}
                    alt={user.username}
                    width={45}
                    height={45}
                    className="cursor-pointer rounded-full"
                  />
                </Link>
                <div>
                  <Link href={`/users/${user.username}`} passHref>
                    <p className="cursor-pointer font-medium hover:underline">
                      {user.displayName}
                    </p>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    @{user.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">No likes yet.</p>
          )}
          {likedUsers && likedUsers.length > 2 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="text-sm font-medium text-primary hover:underline"
            >
              Show more
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
