export function notFound(req, res) {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  // Invalid ObjectId, e.g. /api/items/123
  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  // Schema validation failed
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors: messages });
  }
  // Duplicate unique field, e.g. SKU
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }
  console.error(err);
  res.status(500).json({ message: "Something went wrong on the server" });
}