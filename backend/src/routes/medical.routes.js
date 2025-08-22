import { Router } from "express";
import multer from "multer";
import { auth, permit } from "../middleware/auth.js";
import {
  uploadMedicalHistory,
  getMedicalHash,
} from "../controllers/medical.controller.js";
import { ROLES } from "../utils/constants.js";

const r = Router();
const upload = multer({ dest: "uploads/" });

r.post("/upload", upload.single("file"), uploadMedicalHistory);
r.get("/upload/hash", getMedicalHash);

export default r;
