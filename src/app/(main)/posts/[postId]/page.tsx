import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { Loader2 } from "lucide-react";
import { cache, Suspense } from "react";
import { validateRequest } from "@/auth";
import Post from "@/components/posts/Post";
import { notFound } from "next/navigation";
import { getPostDataInclude, UserData } from "@/lib/types";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";

interface PageProps {
  params: { postId: string };
}

const getPost = cache(async (postId: string, loggedInUserId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    include: getPostDataInclude(loggedInUserId),
  });

  if (!post) notFound();

  return post;
});

export async function generateMetadata({
  params: { postId },
}: PageProps): Promise<Metadata> {
  const { user } = await validateRequest();

  if (!user) return {};

  const post = await getPost(postId, user.id);

  return {
    title: `${post.user.displayName}: ${post.content.slice(0, 50)}...`,
  };
}

interface UserInfoProps {
  user: UserData;
}

async function UserInfoSidebar({ user }: UserInfoProps) {
  const { user: loggedInUser } = await validateRequest();

  if (!loggedInUser) return null;

  return (
    <div className="space-y-3 rounded-sm border bg-card p-5 shadow-sm">
      <div className="text-lg font-semibold">About this user</div>
      <div className="flex items-center gap-x-5">
        <div>
          <Link href={`/users/${user.username}`}>
            <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
          </Link>
        </div>
        <div>
          <p className="text-base font-medium">{user.displayName}</p>
        </div>
      </div>
      <div>
        <p className="text-muted-foreground">{user.bio}</p>
      </div>
    </div>
  );
}

export default async function Page({ params: { postId } }: PageProps) {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <p className="text-destructive">
        You&apos;re not authorized to view this page.
      </p>
    );
  }

  const post = await getPost(postId, user.id);

  return (
    <main className="flex flex-col lg:flex-row w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <Post post={post} />
      </div>
      <div className="lg:sticky lg:top-[5.25rem] h-fit w-full lg:w-80 flex-none lg:block">
        <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
          <UserInfoSidebar user={post.user} />
        </Suspense>
      </div>
    </main>
  );
}
