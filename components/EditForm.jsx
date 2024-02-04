"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";
export default function EditForm({
  id,
  title: initialTitle,
  category: initialCategory,
  price: initialPrice,
  description: initialDescription,
  imageurl: initialImageUrl,
}) {
  const router = useRouter();
  const session = useSession();
  const [title, setTitle] = useState(initialTitle);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState(initialPrice);
  const [description, setDescription] = useState(initialDescription);
  const [imageurl, setImageUrl] = useState(initialImageUrl);
  if (session.status === "unauthenticated") {
    router.push("/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/food/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          category,
          imageurl,
          price,
        }),
      });
      if (res.ok) {
        router.push("/dashboard");
      } else {
        throw new Error("Failed to edit food");
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (session.status === "authenticated") {
    return (
      <div className="min-h-screen max-w-[1640px] mx-auto items-center p-4 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-yellow-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className=" relative px-4 py-10 bg-orange-400 shadow-lg sm:rounded-3xl sm:p-20">
            <div className="text-center pb-6">
              <h1 className="text-3xl">Update</h1>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Name"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                name="category"
                className="shadow appearance-none mb-4 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
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
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="shadow mb-4 appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Image URL"
                name="imageurl"
                value={imageurl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <textarea
                className="shadow mb-4 min-h-0 resize-none appearance-none border rounded h-64 w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Describe the food"
                style={{ height: "121px" }}
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="flex justify-between">
                <input
                  className="shadow cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  value="Update ➤"
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
