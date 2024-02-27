import NodeCache from "node-cache";
import Form from "../model/Form.js";

const myCache = new NodeCache({
  stdTTL: 1000,
});
export const RegisterForm = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    pAddressstreet1,
    pAddressstreet2,
    rAddressstreet1,
    rAddressstreet2,
  } = req.body;
  const image = req?.files["image"][0];
  const pdf = req?.files["pdf"][0];
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthDate ||
      !image ||
      !pAddressstreet1 ||
      !pAddressstreet2 ||
      !rAddressstreet1 ||
      !rAddressstreet2 ||
      !pdf
    ) {
      return res
        .status(400)
        .json({ error: "Please fill all the fields", success: false });
    }
    const existForm = await Form.findOne({ email });
    if (existForm) {
      return res
        .status(400)
        .json({ message: "Already filled the form", success: false });
    }
    await Form.create({
      firstName,
      lastName,
      email,
      birthDate,
      pAddressstreet1,
      pAddressstreet2,
      rAddressstreet1,
      rAddressstreet2,
      pdfFile: {
        fileName: pdf.filename,
        path: pdf.path,
      },
      imageFile: {
        fileName: image.filename,
        path: image.path,
      },
    });
    return res.status(201).json({
      message: "Form Submitted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};

export const searchForm = async (req, res) => {
  try {
    const { name } = req.query;
    const searchObj = name || "";
    const users = await Form.find({
      firstName: { $regex: searchObj, $options: "i" },
    });
    if (!users) {
      res.status(400).json({ message: "No user found", success: false });
    }
    return res.status(200).json({ users, success: true });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", success: false });
  }
};
export const getALlforms = async (req, res) => {
  try {
    let forms;
    if (myCache.has("forms")) {
      forms = myCache.get("forms");
      return res.status(200).json({ forms, message: "Forms", success: true });
    } else {
      forms = await Form.find({}).sort("-createdAt").limit(1);
      myCache.set("forms", forms);
      return res.status(200).json({ forms, message: "Forms", success: true });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error ",
      success: false,
    });
  }
};
