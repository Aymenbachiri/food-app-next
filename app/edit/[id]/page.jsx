import EditForm from "@/components/EditForm";

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

export default async function Edit({ params }) {
  const food = await getData(params.id);
  return (
    <EditForm
      id={food._id}
      title={food.title}
      category={food.category}
      price={food.price}
      description={food.description}
      imageurl={food.imageurl}
    />
  );
}
