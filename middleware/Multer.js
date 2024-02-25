import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = "./uploads";
    if (file.fieldname === "image") {
      uploadFolder = "./uploads/images";
    } else if (file.fieldname === "pdf") {
      uploadFolder = "./uploads/pdf";
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

export const upload = multer({
  storage: storage,
});
