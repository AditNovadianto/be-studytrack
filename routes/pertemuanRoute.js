import express from "express";
import {
  createPertemuan,
  deletePertemuan,
  getAllPertemuanByMatakuliah,
  updatePertemuan,
} from "../controllers/pertemuanController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createPertemuan", verifyToken, createPertemuan);
router.get(
  "/getAllPertemuanByMatakuliah/:id_matakuliah",
  verifyToken,
  getAllPertemuanByMatakuliah,
);
router.put("/updatePertemuan/:id_pertemuan", verifyToken, updatePertemuan);
router.delete("/deletePertemuan/:id_pertemuan", verifyToken, deletePertemuan);

export default router;
