"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Add() {
  const session = useSession();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const category = e.target[1].value;
    const price = e.target[2].value;
    const imageurl = e.target[3].value;
    const description = e.target[4].value;

    try {
      const res = await fetch("/api/food", {
        method: "POST",
        body: JSON.stringify({
          title,
          category,
          price,
          imageurl,
          description,
          owner: session.data.user.name,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to create food");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  if (session.status === "authenticated") {
    return (
      <div className="min-h-screen max-w-[1640px] mx-auto items-center p-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className=" relative px-4 py-10 bg-orange-400 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="text-center pb-6">
              <h1 className="text-3xl">
                Join our community and share your delicious food with food
                lovers around the world
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                name="title"
              />
              <select
                name="category"
                className="shadow appearance-none mb-4 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option disabled value="">
                  Select a category
                </option>
                <option value="burger">Burger</option>
                <option value="pizza">Pizza</option>
                <option value="dessert">Dessert</option>
                <option value="chicken">Chicken</option>
              </select>
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Price"
                name="price"
              />
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Image URL"
                name="imageurl"
              />
              <textarea
                className="shadow mb-4 min-h-0 resize-none appearance-none border rounded h-64 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Describe the food"
                style={{ height: "121px" }}
                name="description"
              />
              <div className="flex justify-between">
                <input
                  className="shadow cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Publish ➤"
                />
                <input
                  className="shadow cursor-pointer bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="reset"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
