import Food from "@/models/Food";
import connectToDB from "@/utils/database";

export async function POST(req) {
  const body = await req.json();
  const newFood = new Food(body);
  try {
    await connectToDB();
    await newFood.save();

    return new Response("Food has been created", { status: 201 });
  } catch (error) {
    console.error("Error creating food", error);
    return new Response("Failed to create food", { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();

    const food = await Food.find();

    return new Response(JSON.stringify(food), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all food", { status: 500 });
  }
}
