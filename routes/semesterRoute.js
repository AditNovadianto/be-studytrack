import express from "express";
import {
  createSemester,
  deleteSemester,
  getActiveSemester,
  getAllSemesterByNim,
  updateSemester,
} from "../controllers/semesterController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createSemester", verifyToken, createSemester);
router.get(
  "/getAllSemesterByNim/:nim_mahasiswa",
  verifyToken,
  getAllSemesterByNim,
);
router.get("/getActiveSemester/:nim_mahasiswa", verifyToken, getActiveSemester);
router.put("/updateSemester/:id_semester", verifyToken, updateSemester);
router.delete("/deleteSemester/:id_semester", verifyToken, deleteSemester);

export default router;
