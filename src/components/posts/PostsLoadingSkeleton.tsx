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
    <div className="w-full animate-pulse space-y-3 rounded-md border bg-card p-5 shadow-sm">
      <div className="flex flex-wrap gap-3">
        <Skeleton className="size-12 rounded-full border-2 bg-primary/10" />
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-24 rounded-md border-2 bg-primary/10" />
          <Skeleton className="h-4 w-20 rounded-md border-2 bg-primary/10" />
        </div>
      </div>
      <Skeleton className="h-16 rounded-md border-2 bg-primary/10" />
    </div>
  );
}
