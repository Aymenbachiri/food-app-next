import { Schema, model, models } from "mongoose";

const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageurl: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Food = models.Food || model("Food", foodSchema);
export default Food;
