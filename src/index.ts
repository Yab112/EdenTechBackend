import express, { Request, Response } from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface ContactRequestBody {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  budget?: string;
  projectDetails: string;
}

app.post("/api/contact", async (req: Request, res: Response) => {
  const {
    fullName,
    email,
    companyName,
    phoneNumber,
    budget,
    projectDetails,
  }: ContactRequestBody = req.body;

  // Validate
  if (!fullName || !email || !companyName || !projectDetails) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  // Setup transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Eden Tech" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || "eshetieyabibal@gmail.com",
    replyTo: email,
    subject: `New Contact Form Submission from ${fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Company Name:</strong> ${companyName}</p>
      <p><strong>Phone Number:</strong> ${phoneNumber || "Not provided"}</p>
      <p><strong>Project Budget:</strong> ${budget || "Not specified"}</p>
      <p><strong>Project Details:</strong> ${projectDetails}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
