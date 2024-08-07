import { redirect } from "next/navigation";
import { validateRequest } from "@/auth";
import SessionProvider from "./sessionProvider";
import NavBar from "./navBar";
import MenuBar from "./menuBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await validateRequest();

  if (!session.user) redirect("/login");

  return (
    <SessionProvider value={session}>
      <div className="flex flex-col min-h-screen">
        <NavBar />
        <div className="flex grow w-full max-w-7xl mx-auto gap-5 p-5">
          <MenuBar className="hidden sm:block sticky top-[5.25rem] h-fit flex-none space-y-3 p-[6px] lg:p-5 xl:w-80 shadow-sm rounded-xl border bg-card" />
          {children}
        </div>
        <MenuBar className="sm:hidden sticky bottom-0 flex justify-center w-full gap-5 p-3 border-t bg-card" />
      </div>
    </SessionProvider>
  );
}
