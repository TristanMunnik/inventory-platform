import { Router } from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/itemController.js";
import { protect, restrictTo } from "../middleware/auth.js";

const router = Router();

router.use(protect); // every item route now requires login

router.route("/").get(getItems).post(createItem);
router.route("/:id")
  .get(getItem)
  .put(updateItem)
  .delete(restrictTo("admin"), deleteItem);

export default router;