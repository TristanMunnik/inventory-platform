import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/items", itemRoutes);

app.use(notFound);      // must come after all routes
app.use(errorHandler);  // must be last

export default app;