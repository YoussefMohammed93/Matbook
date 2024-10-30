import Link from "next/link";
import { cn } from "@/lib/utils";
import kyInstance from "@/lib/ky";
import { useState, useEffect } from "react";
import { NotificationData } from "@/lib/types";
import UserAvatar from "@/components/UserAvatar";
import { NotificationType } from "@prisma/client";
import { Heart, MessageCircle, User2, Reply } from "lucide-react";

interface NotificationProps {
  notification: NotificationData;
}

export default function Notification({ notification }: NotificationProps) {
  const [isPostDeleted, setIsPostDeleted] = useState(false);

  const notificationTypeMap: Record<
    NotificationType,
    { message: string; icon: JSX.Element; href: string | null }
  > = {
    FOLLOW: {
      message: ` started following you`,
      icon: <User2 className="size-7 text-primary" />,
      href: `/users/${notification.issuer.username}`,
    },
    COMMENT: {
      message: ` commented on your post`,
      icon: <MessageCircle className="size-7 fill-primary text-primary" />,
      href: notification.postId ? `/posts/${notification.postId}` : null,
    },
    LIKE: {
      message: ` liked your post`,
      icon: <Heart className="size-7 fill-red-500 text-red-500" />,
      href: notification.postId ? `/posts/${notification.postId}` : null,
    },
    REPLY: {
      message: ` replied to your comment`,
      icon: <Reply className="size-7 text-primary" />,
      href: notification.postId ? `/posts/${notification.postId}` : null,
    },
  };

  const { message, icon, href } = notificationTypeMap[notification.type];

  // Fetch post status (check if it exists)
  useEffect(() => {
    async function checkPostStatus() {
      if (notification.postId) {
        try {
          const response = await kyInstance
            .get(`/api/posts/${notification.postId}`)
            .json();
          if (!response) {
            setIsPostDeleted(true); // Set state if post does not exist
          }
        } catch (error) {
          setIsPostDeleted(true); // Handle errors as post deleted
        }
      }
    }
    checkPostStatus();
  }, [notification.postId]);

  return (
    <Link
      href={isPostDeleted || !href ? "/post-deleted" : href}
      className="block"
    >
      <article
        className={cn(
          "flex gap-3 rounded-md border bg-card p-5 shadow-sm transition-colors hover:bg-card/70",
          !notification.read && "bg-primary/10",
        )}
      >
        <div className="my-1">{icon}</div>
        <div className="space-y-3">
          <UserAvatar avatarUrl={notification.issuer.avatarUrl} size={36} />
          <div>
            <span className="font-bold">{notification.issuer.displayName}</span>
            <span>{message}</span>
          </div>
          {notification.Post && !isPostDeleted && (
            <div className="line-clamp-3 whitespace-pre-line text-muted-foreground">
              {notification.Post.content}
            </div>
          )}
          {isPostDeleted && (
            <div className="text-muted-foreground">
              This post has been deleted.
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
