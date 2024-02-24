import express from "express";
import { PORT } from "./config/lib.js";
import { connectDb } from "./db/Connection.js";
import router from "./routes/Form.js";
import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/api/v1", router);

try {
  app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running on port ${PORT}`);
  });
} catch (error) {
  console.log(error);
}
