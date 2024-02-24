import Form from "../model/Form.js";

export const RegisterForm = async (req, res) => {
  const {
    firstName,
    lastName,
    birthDate,
    email,
    residentAddress,
    permanentAddress,
    pdfFile,
    imageFile,
  } = req.body;
  try {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !birthDate ||
      !residentAddress ||
      !permanentAddress ||
      !pdfFile ||
      !imageFile
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
      permanentAddress,
      residentAddress,
      pdfFile,
      imageFile,
    });

    return res.status(201).json({
      message: "Form Submitted Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error.message);
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
