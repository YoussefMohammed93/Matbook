import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationsLoadingSkeleton() {
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
        <Skeleton className="size-8 rounded-full border-2 bg-primary/10" />
        <Skeleton className="size-8 rounded-full border-2 bg-primary/10" />
      </div>
      <Skeleton className="h-8 rounded-md border-2 bg-primary/10" />
      <Skeleton className="h-8 rounded-md border-2 bg-primary/10" />
    </div>
  );
}
