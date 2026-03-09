import express from "express";
import {
  createNote,
  getAllNotesByMatakuliahAndPertemuan,
} from "../controllers/noteController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get(
  "/getAllNotesByMatakuliahAndPertemuan/:id_matakuliah/:id_pertemuan",
  verifyToken,
  getAllNotesByMatakuliahAndPertemuan,
);
router.post("/createNote", verifyToken, createNote);

export default router;
