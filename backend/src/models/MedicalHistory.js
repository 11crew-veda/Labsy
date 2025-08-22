import mongoose from "mongoose";

const medicalHistorySchema = new mongoose.Schema(
  {
    patient: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "User",
      // required: true,
      type: String, // For testing purposes, using String instead of ObjectId
    },
    history: { type: String, required: true },
    fileUrl: { type: String },
    hash: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("MedicalHistory", medicalHistorySchema);
