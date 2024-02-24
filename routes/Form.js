import express from "express";
import { RegisterForm, searchForm } from "../controllers/Form.js";

const router = express.Router();

router.post("/submit", RegisterForm);
router.get("/search", searchForm);

export default router;
