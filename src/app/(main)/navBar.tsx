import SearchField from "@/components/searchField";
import UserButton from "@/components/userBtn";
import Link from "next/link";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-10 shadow-sm bg-card">
      <div className="flex items-center justify-between flex-wrap gap-2 sm:gap-5 mx-auto py-3 px-5 sm:px-6 max-w-7xl">
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            className="text-2xl sm:text-3xl font-bold text-primary pb-1"
          >
            Matbook
          </Link>
          <SearchField />
        </div>
        <UserButton className="sm:ms-auto" />
      </div>
    </header>
  );
}
