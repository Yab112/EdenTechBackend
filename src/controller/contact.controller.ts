import { Request, Response } from "express";
import { ContactFormData } from "../types/contact.types";
import { validateContactInput } from "../utils/validationinput";
import { sendEmail } from "../service/contact.service";
import { Lead } from "../models/lead.model";

export async function handleContactForm(req: Request, res: Response) {
  const formData: ContactFormData = req.body;

  const error = validateContactInput(formData);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    await Lead.create(formData);

    await sendEmail(formData);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    console.error("Failed to send email:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
