    import { ContactFormData } from "../types/contact.types";

export function validateContactInput(data: ContactFormData): string | null {
  const { fullName, email, companyName, projectDetails } = data;

  if (!fullName || !email || !companyName || !projectDetails) {
    return "Missing required fields";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format";
  }

  return null; // no error
}
