import mongoose from "mongoose";

const FormSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    birthDate: {
      type: Date,
      required: true,
    },
    pAddressstreet1: {
      type: String,
      required: true,
    },
    pAddressstreet2: {
      type: String,
      required: true,
    },
    rAddressstreet1: {
      type: String,
      required: true,
    },
    rAddressstreet2: {
      type: String,
      required: true,
    },
    pdfFile: {
      fileName: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
    imageFile: {
      fileName: {
        type: String,
        required: true,
      },
      path: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Form = mongoose.model("Form", FormSchema);
export default Form;
