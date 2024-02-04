"use client";
import { addToCart } from "@/ReduxToolkit/foodSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FoodCard({
  id,
  title,
  category,
  price,
  description,
  imageurl,
  owner,
}) {
  const dispatch = useDispatch();
  const notify = () =>
    toast.success("Food has been successfully added to the cart", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  return (
    <div className="flex-col md:flex-row justify-between flex gap-4 items-start mx-4 py-12">
      <div className="mx-auto">
        <div>
          <div className="flex bg-white  md:w-[900px] rounded-lg shadow dark:bg-gray-800">
            <div className="relative flex-none w-24 md:w-[65%]">
              <img
                src={imageurl}
                alt="food image"
                className="absolute inset-0 object-cover w-full h-full rounded-lg"
              />
            </div>
            <form className="flex-auto p-6">
              <div className="flex flex-wrap">
                <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">
                  {title}
                </h1>
                <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                  ${price}
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="flex-auto text-xl font-semibold dark:text-gray-50">
                  Restaurant : {owner}
                </h1>
                <div className="text-xl font-semibold text-gray-500 dark:text-gray-300">
                  {description}
                </div>
              </div>
              <div className="flex mb-4 text-sm font-medium mt-4">
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        id,
                        title,
                        price,
                        imageurl,
                        quantity: 1,
                        category,
                        description,
                      })
                    );
                    notify();
                  }}
                  type="button"
                  className="py-2 px-4  bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Buy now
                </button>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-300">
                Free shipping
              </p>
              <ToastContainer />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
