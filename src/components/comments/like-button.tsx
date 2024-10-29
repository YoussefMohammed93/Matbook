"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "@/app/(main)/SessionProvider";
import avatarPlaceholder from "@/assets/avatar-placeholder.png";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

interface LikedUser {
  username: string;
  displayName: string;
  avatarUrl: string;
}

interface LikeButtonProps {
  commentId: string;
  initialLikeCount: number;
  isInitiallyLiked: boolean;
}

export default function LikeButton({
  commentId,
  initialLikeCount,
  isInitiallyLiked,
}: LikeButtonProps) {
  const { user } = useSession();
  const [isLiked, setIsLiked] = useState(isInitiallyLiked);
  const [likeCount, setLikeCount] = useState(initialLikeCount);

  const {
    data: likedUsers,
    isLoading,
    error,
  } = useQuery<LikedUser[]>({
    queryKey: ["comment-liked-users", commentId],
    queryFn: () =>
      fetch(`/api/comments/${commentId}/liked-users`).then((res) => res.json()),
  });

  useEffect(() => {
    setIsLiked(isInitiallyLiked);
    setLikeCount(initialLikeCount);
  }, [initialLikeCount, isInitiallyLiked]);

  const handleLikeToggle = async () => {
    if (!user) return;

    const res = await fetch(`/api/comments/${commentId}/like`, {
      method: "POST",
    });

    if (res.ok) {
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={handleLikeToggle}>
        <Heart
          className={`size-5 ${isLiked ? "fill-current text-red-500" : ""}`}
        />
      </button>
      <Dialog>
        <DialogTrigger asChild>
          <button className="text-sm font-medium tabular-nums">
            {likeCount} <span className="inline">likes</span>
          </button>
        </DialogTrigger>
        <DialogContent className="scrollbar-thumb-green max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Users who liked this comment</DialogTitle>
            <DialogClose />
          </DialogHeader>
          <div className="space-y-2">
            {isLoading && <Loader2 className="size-5 animate-spin" />}
            {error && <p>Error loading users</p>}
            {likedUsers && likedUsers.length > 0 ? (
              likedUsers.map((user: LikedUser, index) => (
                <div
                  key={user.username}
                  className={`flex items-center gap-2 py-3 ${
                    index < likedUsers.length - 1 ? "border-b" : ""
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
