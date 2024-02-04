"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaRegEdit } from "react-icons/fa";
import useSWR from "swr";
import { TiDelete } from "react-icons/ti";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/myfood?owner=${session?.data?.user.name}`,
    fetcher
  );

  function formatTimestamp(timestamp) {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", options);

    return formattedDate;
  }

  const handleDelete = async (id) => {
    try {
      // Prompt the user for confirmation
      const confirmed = window.confirm(
        "Are you sure you want to delete this food?"
      );

      // If the user confirms
      if (confirmed) {
        const res = await fetch(`/api/food/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          mutate();
        }
        if (!res.ok) {
          throw new Error("Failed to delete food");
        }
      } else {
        // Handle if the user cancels the deletion
        console.log("Deletion canceled by user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (session.status === "unauthenticated") {
    router.push("/login");
  }
  <div className="flex justify-center items-center text-center mx-auto mt-8  border-gray-300 h-[100px] w-[100px] animate-spin rounded-full border-8 border-t-blue-600" />;

  if (session.status === "authenticated") {
    return (
      <div className="container w-full mx-auto p-4 ">
        <h1 className="text-center text-4xl font-bold">My Food</h1>
        {data ? (
          <div className="grid gap-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-transparent rounded-lg overflow-hidden shadow-lg ring-4 ring-red-500 ring-opacity-40 max-w-sm"
              >
                <div className="relative w-full h-[500px] bg-transparent">
                  <img
                    className="w-full h-full object-cover bg-transparent"
                    src={item.imageurl}
                    alt="Product Image"
                  />
                  <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {item.price} $
                  </div>
                  <div className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
                    {item.category}
                  </div>
                </div>
                <div className="p-4  h-[210px]">
                  <h3 className="text-lg font-medium mb-2 h-10 text-gray-800 dark:text-white">
                    {item.title.substring(0, 30)} ...
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 h-10 dark:text-white">
                    {item.description.substring(0, 91)} ...
                  </p>
                  <div className="flex items-center justify-between text-center pt-4 text-gray-800 dark:text-white">
                    <span className="font-bold text-lg">
                      {formatTimestamp(item.updatedAt).substring(0, 10)}{" "}
                    </span>
                    <Link
                      href={`/food/${item._id}`}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded-full"
                    >
                      <TiDelete size={30} />
                    </button>
                    <Link
                      href={`/edit/${item._id}`}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-bold p-2 rounded-full text-center"
                    >
                      <FaRegEdit className="mx-auto" size={30} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <h1 className="mt-10">
              You don&apos;t have any product.
              <Link className="ml-2 underline" href="/add">
                Create One
              </Link>
            </h1>
          </>
        )}
      </div>
    );
  }
}
