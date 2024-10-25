import ForYouFeed from "./for-you-feed";
import TrendsSidebar from "@/components/trends-sidebar";
import PostEditor from "@/components/posts/editor/post-editor";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed />
      </div>
      <TrendsSidebar />
    </main>
  );
}
