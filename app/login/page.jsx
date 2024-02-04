"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res.ok) {
        router.push("/dashboard");
      }
      if (!res.ok) {
        throw new Error("Wrong Credentails");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-16">
      <h1 className="text-4xl font-bold">Welcome</h1>
      <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
        <input
          type="text"
          placeholder="Email"
          required
          className="p-4 bg-transparent border border-[#bbb] rounded-md text-xl font-bold"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-4 bg-transparent border border-[#bbb] rounded-md text-xl font-bold"
        />
        <button type="submit" className="w-[300px] p-4 bg-[#ff9535] font-bold">
          Login
        </button>
        <h1>
          Don&apos;t Have Account,{" "}
          <Link className="underline" href="/register">
            Register
          </Link>
        </h1>
      </form>
    </div>
  );
}
