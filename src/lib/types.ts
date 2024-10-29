import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string): Prisma.UserSelect {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    email: true,
    bio: true,
    createdAt: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
        postId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
        likes: true,
      },
    },
  };
}

export function getPostDataInclude(loggedInUserId: string) {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    attachments: true,
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    bookmarks: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        comments: true,
      },
    },
  };
}

export function getCommentDataInclude(
  loggedInUserId: string,
): Prisma.CommentInclude {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    likes: {
      where: {
        userId: loggedInUserId,
      },
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
        replies: true,
      },
    },
  };
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export type ReplyData = Prisma.ReplyGetPayload<{
  include: {
    user: {
      select: {
        id: true;
        username: true;
        displayName: true;
        avatarUrl: true;
        createdAt: true;
      };
    };
  };
}>;

export const notificationsInclude: Prisma.NotificationInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  Post: {
    select: {
      content: true,
    },
  },
};

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface RepliesPage {
  replies: ReplyData[];
  previousCursor: string | null;
}
