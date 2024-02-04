"use client";

import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { BsFillCartFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import Image from "next/image";
import logo from "/public/hamburger.png";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";
import { useSelector } from "react-redux";

async function getData() {
  const res = await fetch("/api/food", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default function Navbar() {
  const session = useSession();
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const cart = useSelector((state) => state.food.products);

  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-[1640px] mx-auto flex justify-between items-center p-4 sticky top-0 bg-black/20 z-30">
      {/* Left side */}
      <div className="flex items-center">
        <div
          onClick={() => setNav(!nav)}
          className="cursor-pointer md:hidden mr-8"
        >
          <AiOutlineMenu size={30} />
        </div>
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="logo" width={50} height={50} />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl px-2 hidden md:flex font-bold">
            TastyToGo
          </h1>
        </Link>
        <Link
          href="/cart"
          className="relative flex md:hidden items-center py-2 rounded-full ml-4"
        >
          <BsFillCartFill size={20} className="mr-2" /> Cart
          <div className="absolute w-4 h-4 rounded-full z-10 right-[-3px] top-0 flex items-center justify-center text-[10px] text-white bg-red-600">
            {cart.length}
          </div>
        </Link>
        {session.status === "authenticated" && (
          <Link
            className="flex items-center gap-2 hover:border-b md:hidden ml-4"
            href="/dashboard"
          >
            <FaUserCircle size={20} />
            {session.data.user.name}
          </Link>
        )}
        <button className="cursor-pointer hover:border-b ml-4 md:hidden">
          <ThemeSwitch />
        </button>
      </div>
      {/* Search Input */}
      <div className=" hidden bg-white flex-[1] mr-2 rounded-full md:flex items-center p-2 px-2 w-[200px] sm:w-[400px] lg:w-[500px]">
        <AiOutlineSearch color="black" size={25} />
        <input
          className="bg-white text-black  w-full focus:outline-none"
          type="text"
          placeholder="Search foods"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <ul className="absolute top-full left-0 w-full text-black border bg-gray-300 border-gray-200 dark:bg-gray-800 dark:text-white rounded-b-md">
        {search &&
          data
            .filter((food) => food.title.toLowerCase().includes(search))
            .map((food) => (
              <Link
                href={`/food/${food._id}`}
                className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100 dark:bg-black/40 dark:hover:bg-white dark:hover:text-black"
                key={food._id}
                onClick={() => setSearch("")}
              >
                <img
                  className="w-10 h-10 rounded-full"
                  src={food.imageurl}
                  alt="image"
                />

                <h1>{food.title}</h1>
              </Link>
            ))}
      </ul>
      <div className="hidden md:flex items-center gap-3">
        <button className="cursor-pointer hover:border-b">
          <ThemeSwitch />
        </button>
        <Link className="hover:border-b" href="/">
          Home
        </Link>
        <Link className="hover:border-b" href="/food">
          Food
        </Link>
        <Link className="hover:border-b" href="/add">
          Add Your Food
        </Link>
        <Link
          href="/cart"
          className="hidden md:flex items-center py-2 rounded-full relative"
        >
          <BsFillCartFill size={20} className="mr-2 hover:border-b" /> Cart
          <div className="absolute w-4 h-4 rounded-full z-10 right-[-3px] top-0 flex items-center justify-center text-[10px] text-white bg-red-600">
            {cart.length}
          </div>
        </Link>
        <Link className="hover:border-b" href="/dashboard">
          dashbaord
        </Link>
        {session.status === "unauthenticated" && (
          <Link href="/login">login</Link>
        )}
        {session.status === "authenticated" && (
          <Link
            className="flex items-center gap-2 hover:border-b"
            href="/dashboard"
          >
            <FaUserCircle size={20} />
            {session.data.user.name}
          </Link>
        )}
        {session.status === "authenticated" && (
          <button className="hover:border-b" onClick={signOut}>
            Logout
          </button>
        )}
      </div>
      {/* Mobile Menu */}
      {/* Overlay */}
      {nav ? (
        <div className="bg-black/80 fixed w-full h-screen z-10 top-0 left-0"></div>
      ) : (
        ""
      )}

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-white dark:bg-black/40  z-10 duration-300"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
        }
      >
        <AiOutlineClose
          onClick={() => setNav(!nav)}
          size={30}
          className="absolute right-4 top-4 cursor-pointer dark:text-white"
        />
        <h2 className="text-2xl p-4 font-bold text-black dark:text-white">
          TastyToGo
        </h2>

        <nav>
          <ul className="flex flex-col p-4 text-gray-800 dark:text-white">
            <li className="text-xl py-4 flex">
              <Link
                className="hover:border-b"
                onClick={() => setNav(!nav)}
                href="/"
              >
                Home
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <Link
                className="hover:border-b"
                onClick={() => setNav(!nav)}
                href="/food"
              >
                Food
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <Link
                className="hover:border-b"
                onClick={() => setNav(!nav)}
                href="/add"
              >
                Add Your Restaurant
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <Link
                className="hover:border-b"
                onClick={() => setNav(!nav)}
                href="/cart"
              >
                Cart
              </Link>
            </li>
            <li className="text-xl py-4 flex">
              <Link
                className="hover:border-b"
                onClick={() => setNav(!nav)}
                href="/dashboard"
              >
                Dashboard
              </Link>
            </li>
            {session.status === "unauthenticated" && (
              <li className="text-xl py-4 flex">
                <Link
                  className="hover:border-b"
                  onClick={() => setNav(!nav)}
                  href="/login"
                >
                  Login
                </Link>
              </li>
            )}
            {session.status === "authenticated" && (
              <li className="text-xl py-4 flex">
                <button className="hover:border-b" onClick={() => signOut()}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}
