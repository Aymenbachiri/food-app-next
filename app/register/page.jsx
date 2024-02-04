"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      if (res.ok) {
        router.push("/login");
      } else {
        throw new Error("Failed to register");
      }
    } catch (error) {
      setError(true);
    }
  };
  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-8">
      <h1 className="text-4xl font-bold">Create an Account</h1>
      <form onSubmit={handleSubmit} className="w-[300px] flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          required
          className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
        />
        <input
          type="text"
          placeholder="Email"
          required
          className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="p-4 bg-transparent border border-[#bbb]  rounded-md text-xl font-bold"
        />
        <button
          type="submit"
          className="w-[300px] p-4 text-white bg-[#ff9535] font-bold"
        >
          Register
        </button>

        <h1 className="text-red-500 font-bold text-2xl">
          {error && "Failed to Register"}{" "}
        </h1>
      </form>
      <span className="">- OR -</span>
      <h1>
        Already Have Account
        <Link className="underline ml-4" href="/login">
          Login
        </Link>
      </h1>
    </div>
  );
}
