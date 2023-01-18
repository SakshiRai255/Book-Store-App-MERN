import express from "express";
const router = express.Router();
import {
  getAllBooks,
  addBook,
  getById,
  updateBook,
  deleteBook
} from "../controllers/booksController.js";

router.get("/", getAllBooks);
router.post("/add", addBook);
router.get("/:id", getById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
