import Link from "next/link";
import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5 bg-[#eee]">
      <div className="flex h-full max-h-[39rem] w-full max-w-[28rem] items-center justify-center overflow-hidden rounded-md border bg-card shadow-sm">
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">Login to matbook</h1>
          <p className="text-center text-muted-foreground">
            A place where even <span className="italic">you</span> can find a
            friend.
          </p>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
              Don&apos;t have an account? Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
