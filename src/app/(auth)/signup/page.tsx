import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import SignUpForm from "./signUpForm";
import SignUpImg from "@/assets/signup.svg";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex items-center justify-center h-screen p-5">
      <div className="flex w-full h-full max-w-[64rem] max-h-[34rem] border overflow-hidden rounded-xl shadow-xl bg-card">
        <div className="w-full md:w-1/2 space-y-10 overflow-y-auto p-5">
          <div className="text-center space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">
              Signup to matbook
            </h1>
            <p className="text-muted-foreground pt-3">
              A place where even <span className="italic">you</span> can find a
              friend.
            </p>
          </div>
          <div>
            <SignUpForm />
            <Link
              href="/login"
              className="block text-center hover:underline mt-4"
            >
              Already have an account? Log in
            </Link>
          </div>
        </div>
        <Image
          src={SignUpImg}
          alt="Sign Up"
          className="hidden md:block w-1/2 object-cover border-l"
        />
      </div>
    </main>
  );
}
