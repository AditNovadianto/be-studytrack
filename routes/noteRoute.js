import express from "express";
import {
  createNote,
  deleteNote,
  getAllNotesByMatakuliahAndPertemuan,
  updateNote,
} from "../controllers/noteController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/getAllNotesByMatakuliahAndPertemuan/:id_matakuliah/:id_pertemuan",
  verifyToken,
  getAllNotesByMatakuliahAndPertemuan,
);
router.post("/createNote", verifyToken, createNote);
router.put("/updateNote/:id", verifyToken, updateNote);
router.delete("/deleteNote/:id", verifyToken, deleteNote);

export default router;
