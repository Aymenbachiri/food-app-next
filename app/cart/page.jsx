"use client";

import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/ReduxToolkit/foodSlice";
import { useDispatch, useSelector } from "react-redux";
import emptycart from "/public/empty-cart.png";
import Link from "next/link";
import Image from "next/image";

export default function Cart() {
  const cart = useSelector((state) => state.food.products);
  const dispatch = useDispatch();
  const totalPrice = cart.reduce((acc, food) => {
    acc += food.price * food.quantity;
    return acc;
  }, 0);
  return (
    <div>
      {cart.length > 0 ? (
        <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
          <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
            <div>
              <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
                Your Cart
              </h2>
              <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-800">
                <div className="flex-wrap items-center hidden mb-6 -mx-4 md:flex md:mb-8">
                  <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Product name
                    </h2>
                  </div>
                  <div className="hidden px-4 lg:block lg:w-2/12">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Price
                    </h2>
                  </div>
                  <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      Quantity
                    </h2>
                  </div>
                  <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                    <h2 className="font-bold text-gray-500 dark:text-gray-400">
                      {" "}
                      Subtotal
                    </h2>
                  </div>
                </div>
                <div className="py-4 mb-8 border-t border-b border-gray-200 dark:border-gray-700">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-wrap items-center mb-6 -mx-4 md:mb-8"
                    >
                      <div className="w-full px-4 mb-6 md:w-4/6 lg:w-6/12 md:mb-0">
                        <div className="flex flex-wrap items-center -mx-4">
                          <div className="w-full px-4 mb-3 md:w-1/3">
                            <div className="w-full relative h-96 md:h-24 md:w-24">
                              <span className="absolute top-1 left-1 flex h-6 w-6 items-center justify-center rounded-full border bg-black text-sm font-medium text-white shadow sm:-top-2 sm:-right-2">
                                {item.quantity}
                              </span>
                              <img
                                src={item.imageurl}
                                alt="cart-image"
                                className="object-cover w-full h-full rounded-full"
                              />
                            </div>
                          </div>
                          <div className="w-2/3 px-4">
                            <h2 className="mb-2 text-xl font-bold dark:text-gray-400">
                              {item.title}
                            </h2>
                            <p className="text-gray-500 dark:text-gray-400 ">
                              {item.description}
                            </p>
                          </div>
                          <div className="">
                            <button
                              onClick={() => dispatch(removeFromCart(item.id))}
                              type="button"
                              className="flex p-2 text-center text-white bg-red-600 rounded-full transition-all duration-200 ease-in-out focus:shadow hover:text-white"
                            >
                              <svg
                                className="block h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                  className=""
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="hidden px-4 lg:block lg:w-2/12">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ${item.price}
                        </p>
                      </div>
                      <div className="w-auto px-4 md:w-1/6 lg:w-2/12 ">
                        <div className="inline-flex items-center px-4 font-semibold text-gray-500 border border-gray-200 rounded-md dark:border-gray-700 ">
                          <button
                            onClick={() => dispatch(decreaseQuantity(item.id))}
                            className="py-2 hover:text-gray-700 dark:text-gray-400"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="w-12 px-2 py-4 text-center border-0 rounded-md dark:bg-gray-800 bg-gray-50 dark:text-gray-400 md:text-right"
                            placeholder="1"
                          />
                          <button
                            onClick={() => dispatch(increaseQuantity(item.id))}
                            className="py-2 hover:text-gray-700 dark:text-gray-400"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <div className="w-auto px-4 text-right md:w-1/6 lg:w-2/12 ">
                        <p className="text-lg font-bold text-blue-500 dark:text-gray-400">
                          ${item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="">
                  <button
                    onClick={() => dispatch(clearCart())}
                    type="button"
                    class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap justify-between">
                <div className="w-full px-4 mb-4 lg:w-1/2 ">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="text-gray-700 dark:text-gray-400">
                      Apply Coupon
                    </span>
                    <input
                      type="text"
                      className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-400 dark:bg-gray-800"
                      placeholder="x304k45"
                      required
                    />
                    <button className="inline-block w-full px-8 py-4 font-bold text-center text-gray-100 bg-[#ff9535] rounded-md lg:w-32 hover:bg-orange-600">
                      Apply
                    </button>
                  </div>
                </div>
                <div className="w-full px-4 mb-4 lg:w-1/2 ">
                  <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                    <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                      Order Summary
                    </h2>
                    <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-300 dark:border-gray-700 ">
                      <span className="text-gray-700 dark:text-gray-400">
                        Subtotal
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                        ${totalPrice}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 mb-4 ">
                      <span className="text-gray-700 dark:text-gray-400 ">
                        Shipping
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400 ">
                        Free
                      </span>
                    </div>
                    <div className="flex items-center justify-between pb-4 mb-4 ">
                      <span className="text-gray-700 dark:text-gray-400">
                        Order Total
                      </span>
                      <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                        ${totalPrice}
                      </span>
                    </div>
                    <h2 className="text-lg text-gray-500 dark:text-gray-400">
                      We offer:
                    </h2>
                    <div className="flex items-center gap-2 mb-4 ">
                      <a href="#">
                        <img
                          src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                          alt=""
                          className="object-cover h-16 w-26"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                          alt=""
                          className="object-cover h-16 w-26"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                          alt=""
                          className="object-cover h-16 w-26"
                        />
                      </a>
                    </div>
                    <div className="flex items-center justify-between ">
                      <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-[#ff9535] rounded-md hover:bg-orange-600">
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="flex-col md:flex md:flex-row justify-center items-cente">
          <div>
            <Image
              src={emptycart}
              alt="emptyCart"
              className="w-80 rounded-lg p-4 mx-auto"
            />
          </div>
          <div className="max-w-[500px] p-4 py-8  flex flex-col gap-4 items-center rounded-md shadow-lg">
            <h1 className="text-xl font-bold uppercase">
              Your Cart feels lonely.
            </h1>
            <p className="text-sm text-center px-10 -mt-2">
              Your Shopping cart lives to serve. Give it purpose - fill it with
              burgers, pizzas, etc. and make it happy.
            </p>
            <Link
              href={"/food"}
              className=" rounded-md cursor-pointer hover:bg-black active:bg-gray-900 px-8 py-2 font-semibold text-lg hover:text-white duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
