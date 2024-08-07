import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import loginImage from "@/assets/login.jpg";
import LoginForm from "./logInForm";
import GoogleBtn from "./google/googleBtn";

export const metadata: Metadata = {
  title: "Log In",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen p-5">
      <div
        className="flex w-full h-full max-w-[64rem] max-h-[34rem] overflow-hidden rounded-xl shadow-xl bg-card"
        style={{ border: "1px solid #e2e8f0" }}
      >
        <div className="w-full md:w-1/2 space-y-10 overflow-y-auto p-5">
          <h1 className="text-center text-2xl sm:text-3xl font-bold">
            Login to matbook 
          </h1>
          <div className="space-y-5">
            <GoogleBtn />
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-muted" />
              <span>OR</span>
              <div className="h-px flex-1 bg-muted" />
            </div>
            <div>
              <LoginForm />
              <Link
                href="/signup"
                className="block text-center hover:underline mt-4"
              >
                Don't have an account? Sign up
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={loginImage}
          alt="Log In"
          className="hidden md:block w-1/2 object-fill"
          style={{ borderLeft: "1px solid #e2e8f0" }}
        />
      </div>
    </main>
  );
}
