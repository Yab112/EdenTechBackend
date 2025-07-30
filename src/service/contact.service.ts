import nodemailer from "nodemailer";
import { ContactFormData } from "../types/contact.types";

export async function sendEmail(data: ContactFormData) {
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
    replyTo: data.email,
    subject: `New Contact Form Submission from ${data.fullName}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Company Name:</strong> ${data.companyName}</p>
      <p><strong>Phone Number:</strong> ${data.phoneNumber || "Not provided"}</p>
      <p><strong>Project Budget:</strong> ${data.budget || "Not specified"}</p>
      <p><strong>Project Details:</strong> ${data.projectDetails}</p>
    `,
  };

  return transporter.sendMail(mailOptions);
}
