import express from "express";
import {
  createMatakuliah,
  deleteMatakuliah,
  getAllMatakuliahBySemester,
  updateMatakuliah,
} from "../controllers/matakuliahController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createMatakuliah", verifyToken, createMatakuliah);
router.get(
  "/getAllMatakuliahBySemester/:id_semester",
  verifyToken,
  getAllMatakuliahBySemester,
);
router.put("/updateMatakuliah/:id_matakuliah", verifyToken, updateMatakuliah);
router.delete(
  "/deleteMatakuliah/:id_matakuliah",
  verifyToken,
  deleteMatakuliah,
);

export default router;
