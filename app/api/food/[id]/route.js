import Food from "@/models/Food";
import connectToDB from "@/utils/database";

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDB();

    const food = await Food.findById(id);
    return new Response(JSON.stringify(food), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch the food", { status: 500 });
  }
};

export const PATCH = async (req, { params }) => {
  const body = await req.json();
  try {
    await connectToDB();
    // Find the exisitingFood
    const existingFood = await Food.findById(params.id);

    if (!existingFood) {
      return new Response("Food not found", { status: 404 });
    }

    // Update the product with the new data
    Object.assign(existingFood, body);
    await existingFood.save();

    return new Response("Food updated successfully", { status: 201 });
  } catch (error) {
    return new Response("Failed to Update Food", { status: 500 });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  try {
    await connectToDB();

    await Food.findByIdAndDelete(id);
    return new Response("Food deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Food", { status: 500 });
  }
};
