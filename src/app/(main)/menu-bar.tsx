import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Bell, Bookmark, Home } from "lucide-react";

interface MenuBarProps {
  className?: string;
}
export default function MenuBar({ className }: MenuBarProps) {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link href="/">
          <Home style={{ width: 22, height: 22 }} />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link href="/bookmarks">
          <Bookmark style={{ width: 22, height: 22 }} />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link href="/notifications">
          <Bell style={{ width: 22, height: 22 }} />
          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
    </div>
  );
}
