import Item from "../models/Item.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

// GET /api/items
export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find().sort({ createdAt: -1 });
  res.json(items);
});

// GET /api/items/:id
export const getItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// POST /api/items
export const createItem = asyncHandler(async (req, res) => {
  const item = await Item.create(req.body);
  res.status(201).json(item);
});

// PUT /api/items/:id
export const updateItem = asyncHandler(async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,           // return the updated document
    runValidators: true, // apply schema rules on updates too
  });
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json(item);
});

// DELETE /api/items/:id
export const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ message: "Item not found" });
  res.json({ message: "Item deleted" });
});