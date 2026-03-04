import express from "express";
import {
  signUp,
  signIn,
  getAllMahasiswa,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signUpMahasiswa", signUp);
router.post("/signInMahasiswa", signIn);
router.get("/getAllMahasiswa", getAllMahasiswa);

export default router;
