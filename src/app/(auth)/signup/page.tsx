import Link from "next/link";
import { Metadata } from "next";
import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex flex-col justify-center items-center h-full w-full">
        <div className="h-auto max-h-[40rem] w-full max-w-[400px] rounded-xl bg-card shadow-sm border">
          <div className="w-full space-y-10 p-10">
            <div className="space-y-1 text-center">
              <h1 className="text-3xl font-bold mb-3">Sign up to matbook</h1>
              <p className="text-muted-foreground">
                Use <span className="italic">your email</span> to continue
              </p>
            </div>
            <div className="space-y-5">
              <SignUpForm />
              <Link href="/login" className="block text-center hover:underline">
                Already have an account? Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
