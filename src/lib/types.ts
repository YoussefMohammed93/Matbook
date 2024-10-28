import { Prisma } from "@prisma/client";

export function getUserDataSelect(loggedInUserId: string): Prisma.UserSelect {
  return {
    id: true,
    username: true,
    displayName: true,
    avatarUrl: true,
    bio: true,
    createdAt: true,
    email: true,
    passwordHash: true,
    followers: {
      where: {
        followerId: loggedInUserId,
      },
      select: {
        followerId: true,
      },
    },
    _count: {
      select: {
        posts: true,
        followers: true,
        likes: true,
        comments: true,
        commentLikes: true,
      },
    },
    likes: {
      select: {
        userId: true,
        postId: true,
      },
    },
    bookmarks: {
      select: {
        userId: true,
        postId: true,
        createdAt: true,
      },
    },
    comments: {
      select: {
        id: true,
        content: true,
        postId: true,
        createdAt: true,
      },
    },
    commentLikes: {
      select: {
        userId: true,
        commentId: true,
      },
    },
  };
}

export type UserData = Prisma.UserGetPayload<{
  select: ReturnType<typeof getUserDataSelect>;
}>;

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
  } satisfies Prisma.PostInclude;
}

export type PostData = Prisma.PostGetPayload<{
  include: ReturnType<typeof getPostDataInclude>;
}>;

export function getCommentDataInclude(
  loggedInUserId: string,
): Prisma.CommentInclude {
  return {
    user: {
      select: getUserDataSelect(loggedInUserId),
    },
    likes: {
      select: {
        userId: true,
      },
    },
    _count: {
      select: {
        likes: true,
      },
    },
  };
}

export type CommentData = Prisma.CommentGetPayload<{
  include: ReturnType<typeof getCommentDataInclude>;
}>;

export interface CommentsPage {
  comments: CommentData[];
  previousCursor: string | null;
}

export interface PostsPage {
  posts: PostData[];
  nextCursor: string | null;
}

export const notificationsInclude: Prisma.NotificationInclude = {
  issuer: {
    select: {
      username: true,
      displayName: true,
      avatarUrl: true,
    },
  },
  post: {
    select: {
      content: true,
    },
  },
};

export type NotificationData = Prisma.NotificationGetPayload<{
  include: typeof notificationsInclude;
}>;

export interface FollowerInfo {
  followers: number;
  isFollowedByUser: boolean;
}

export interface LikeInfo {
  likes: number;
  isLikedByUser: boolean;
}

export interface BookmarkInfo {
  isBookmarkedByUser: boolean;
}

export interface NotificationCountInfo {
  unreadCount: number;
}

export interface NotificationsPage {
  notifications: NotificationData[];
  nextCursor: string | null;
}
