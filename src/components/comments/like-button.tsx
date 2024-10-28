"use client";

import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "@/app/(main)/SessionProvider";

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
      if (isLiked) {
        setIsLiked(false);
        setLikeCount(likeCount - 1);
      } else {
        setIsLiked(true);
        setLikeCount(likeCount + 1);
      }
    }
  };

  return (
    <button onClick={handleLikeToggle} className="mt-2 flex items-center gap-2">
      <Heart
        className={`size-5 ${isLiked ? "fill-current text-red-500" : ""}`}
      />
      <span className="text-sm font-medium tabular-nums">
        {likeCount} <span className="inline">likes</span>
      </span>
    </button>
  );
}
