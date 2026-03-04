import express from "express";
import {
  createSemester,
  deleteSemester,
  getAllSemesterByNim,
  updateSemester,
} from "../controllers/semesterController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/createSemester", verifyToken, createSemester);
router.get("/getAllSemesterByNim", verifyToken, getAllSemesterByNim);
router.put("/updateSemester/:id_semester", verifyToken, updateSemester);
router.delete("/deleteSemester/:id_semester", verifyToken, deleteSemester);

export default router;
