import FoodCard from "@/components/FoodCard";

async function getData(id) {
  const url = process.env.API_URL;
  const res = await fetch(`${url}/api/food/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
export async function generateMetadata({ params }) {
  const food = await getData(params.id);
  return {
    title: food.title,
    description: food.description,
  };
}

export default async function FoodDetails({ params }) {
  const data = await getData(params.id);
  return (
    <FoodCard
      id={data._id}
      title={data.title}
      category={data.category}
      price={data.price}
      description={data.description}
      imageurl={data.imageurl}
      owner={data.owner}
    />
  );
}
