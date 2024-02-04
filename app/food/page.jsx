"use client";

import { addToCart } from "@/ReduxToolkit/foodSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

async function getData() {
  const res = await fetch("/api/food", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export default function Food() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    getData().then((fetchedData) => {
      setData(fetchedData);
      setFoods(fetchedData);
      setLoading(false);
    });
  }, []);
  if (loading) {
    return (
      <div className="flex justify-center items-center text-center mx-auto mt-8  border-gray-300 h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-blue-600" />
    );
  }
  const filterType = (category) => {
    const filteredFoods = data.filter((item) => {
      const match = item.category.toLowerCase() === category.toLowerCase();

      return match;
    });

    setFoods(filteredFoods);
  };
  const filterPrice = (minPrice, maxPrice) => {
    const filteredFoods = data.filter((item) => {
      const itemPrice = parseFloat(item.price);
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);

      return itemPrice >= min && itemPrice <= max;
    });

    setFoods(filteredFoods);
  };
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
    <div className="mt-4 mb-16">
      <div className="text-center max-w-[1640px] mx-auto flex justify-between items-center p-4">
        <div className="flex justify-center items-center flex-col text-center mx-auto">
          <h1 className="font-bold text-4xl mb-4">
            Welcome to our online food store,{" "}
          </h1>
          <h1 className="text-xl">
            Our commitment to quality and flavor is evident in every product we
            offer.
          </h1>
          <p className="text-xl">
            we invite you to explore our collection and discover the perfect
            addition to your table. Happy shopping and bon appétit!
          </p>
        </div>
      </div>
      <div className="text-center max-w-[1640px] mx-auto flex justify-between items-center p-4">
        <div className="flex justfiy-between flex-wrap">
          <button
            onClick={() => setFoods(data)}
            className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            All
          </button>
          <button
            onClick={() => filterType("burger")}
            className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Burgers
          </button>
          <button
            onClick={() => filterType("pizza")}
            className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Pizza
          </button>
          <button
            onClick={() => filterType("dessert")}
            className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Dessert
          </button>
          <button
            onClick={() => filterType("chicken")}
            className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
          >
            Chicken
          </button>
        </div>
        <div>
          <div className="flex justify-between max-w-[390px] w-full">
            <button
              onClick={() => filterPrice(0, 5)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              5$
            </button>
            <button
              onClick={() => filterPrice(5, 10)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              10$
            </button>
            <button
              onClick={() => filterPrice(10, 15)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              15$
            </button>
            <button
              onClick={() => filterPrice(15, 20)}
              className="m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white"
            >
              20$
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-auto max-w-7xl mt-8">
        {foods.map((item) => (
          <section
            key={item._id}
            className="w-fit mx-auto justify-items-center justify-center "
          >
            <div className="w-72 shadow-md rounded-xl duration-500 hover:shadow-xl">
              <div className="">
                <Link href={`/food/${item._id}`}>
                  <img
                    src={item.imageurl}
                    alt="Product"
                    className="h-80 w-72 object-cover rounded-t-xl"
                  />
                </Link>
                <div className="px-4 py-3 w-72">
                  <Link href={`/food/${item._id}`}>
                    <p className="text-lg font-bold truncate block capitalize">
                      {item.title}
                    </p>
                  </Link>
                  <div className="flex items-center">
                    <p className="text-lg font-semibold cursor-auto my-3">
                      ${item.price}
                    </p>
                    <button
                      onClick={() => {
                        dispatch(
                          addToCart({
                            id: item._id,
                            title: item.title,
                            price: item.price,
                            imageurl: item.imageurl,
                            quantity: 1,
                            category: item.category,
                            description: item.description,
                          })
                        );
                        notify();
                      }}
                      className="ml-auto"
                    >
                      {" "}
                      <IoAddCircleSharp size={40} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <ToastContainer />
          </section>
        ))}
      </div>
    </div>
  );
}
