import express from "express";
import { RegisterForm, getALlforms, searchForm } from "../controllers/Form.js";
import { upload } from "../middleware/Multer.js";

const router = express.Router();

router.post(
  "/submit",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  RegisterForm
);
router.get("/forms", getALlforms);
router.get("/search", searchForm);

export default router;
