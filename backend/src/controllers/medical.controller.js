import catchAsync from "../utils/catchAsync.js";
import MedicalHistory from "../models/MedicalHistory.js";
import crypto from "crypto";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadMedicalHistory = catchAsync(async (req, res) => {
  const history = req.body.medicalHistory;
  const patientId = req.user?.sub || "234"; // For testing purposes
  let fileUrl = "";

  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto",
      folder: "medical_history",
    });
    fileUrl = result.secure_url;
  }

  const record = await MedicalHistory.create({
    patient: 123,
    history,
    fileUrl,
  });

    res.json({ success: true, record });
});

export const getMedicalHash = catchAsync(async (req, res) => {
  const patientId = 123;
  const record = await MedicalHistory.findOne({ patient: patientId });
  if (!record)
    return res.status(404).json({ error: "No medical history found" });

  if (record.hash) {
    return res.json({ hash: record.hash });
  }

  // Create hash for first time
  const hash = crypto
    .createHash("sha256")
    .update(record.history + (record.fileUrl || ""))
    .digest("hex");
  record.hash = hash;
  await record.save();
  res.json({ hash });
});
