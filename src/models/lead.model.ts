import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    companyName: { type: String, required: true },
    phoneNumber: { type: String },
    budget: { type: String },
    projectDetails: { type: String, required: true },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", leadSchema);
