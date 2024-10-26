import { Skeleton } from "../ui/skeleton";

export default function PostsLoadingSkeleton() {
  return (
    <div className="space-y-5">
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
      <PostLoadingSkeleton />
    </div>
  );
}

function PostLoadingSkeleton() {
  return (
    <div className="w-full animate-pulse space-y-3 rounded-sm border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full border-2" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded-sm border-2" />
          <Skeleton className="h-4 w-20 rounded-sm border-2" />
        </div>
      </div>
      <Skeleton className="h-16 rounded-sm border-2" />
    </div>
  );
}
