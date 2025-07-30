import { Router } from "express";
import { handleContactForm } from "../controller/contact.controller";

const router = Router();

router.post("/", handleContactForm);

export default router;
