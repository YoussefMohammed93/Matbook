import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login.svg";
import LoginForm from "./logInForm";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen p-5">
      <div className="flex w-full h-full max-w-[64rem] max-h-[34rem] overflow-hidden border rounded-xl shadow-xl bg-card">
        <div className="w-full md:w-1/2 space-y-10 overflow-y-auto p-5">
          <h1 className="text-center text-2xl sm:text-3xl font-bold">
            Login to matbook
          </h1>
          <div className="space-y-5">
            <LoginForm />
            <Link
              href="/signup"
              className="block text-center hover:underline mt-4"
            >
              Don't have an account? Sign up
            </Link>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="Log In"
          className="hidden md:block w-1/2 border-l object-fill"
        />
      </div>
    </main>
  );
}
