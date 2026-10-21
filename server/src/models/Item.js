
import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      uppercase: true,
      trim: true,
    },
    category: { type: String, required: [true, "Category is required"], trim: true },
    quantity: { type: Number, required: true, min: [0, "Quantity cannot be negative"], default: 0 },
    minQuantity: { type: Number, min: 0, default: 5 },
    location: { type: String, trim: true },
    status: { type: String, enum: ["active", "maintenance", "retired"], default: "active" },
    imageUrl: { type: String, trim: true },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

export default mongoose.model("Item", itemSchema);