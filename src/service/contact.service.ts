import nodemailer from "nodemailer";
import { ContactFormData } from "../types/contact.types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

export async function sendEmail(data: ContactFormData) {
  try {
    // Email to YOU
    const mailToOwner = {
      from: `"Eden Tech" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO || "eshetieyabibal@gmail.com",
      replyTo: data.email,
      subject: `📥 New Contact Form Submission from ${data.fullName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${
        data.email
      }</a></p>
        <p><strong>Company Name:</strong> ${data.companyName}</p>
        <p><strong>Phone Number:</strong> ${
          data.phoneNumber || "Not provided"
        }</p>
        <p><strong>Project Budget:</strong> ${
          data.budget || "Not specified"
        }</p>
        <p><strong>Project Details:</strong> ${data.projectDetails}</p>
      `,
    };

    // Email to CLIENT
    const autoReplyToClient = {
      from: `"Eden Tech" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: `✅ We Received Your Inquiry – Thanks, ${data.fullName}!`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #4CAF50;">Thank You for Reaching Out! 🙏</h2>
          <p>Hey ${data.fullName},</p>
          <p>We’ve received your project request at <strong>Eden Tech</strong> and we’re thrilled to learn more about what you're building!</p>
          <p>Our team will review your submission and get back to you as soon as possible – usually within 24–48 hours.</p>
          <p>Meanwhile, feel free to reply to this email if you have additional details or questions.</p>
          <hr />
          <p style="font-size: 0.9em; color: #888;">This is an auto-generated confirmation email. No need to reply unless you'd like to share more info.</p>
          <p style="margin-top: 20px;">Cheers,<br/><strong>The Eden Tech Team 🚀</strong></p>
        </div>
      `,
    };

    // Send both emails
    const [ownerRes, clientRes] = await Promise.all([
      transporter.sendMail(mailToOwner),
      transporter.sendMail(autoReplyToClient),
    ]);

    return { ownerRes, clientRes };
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
}
