import Food from "@/models/Food";
import connectToDB from "@/utils/database";

export async function GET(req) {
  const url = new URL(req.url);

  const owner = url.searchParams.get("owner");
  try {
    await connectToDB();

    const foods = await Food.find(owner && { owner });
    return new Response(JSON.stringify(foods), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch my foods", { status: 500 });
  }
}
