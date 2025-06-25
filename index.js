import express from "express";

import router from "./src/routes/index.js";
import connectDB from "./src/common/configs/connectDB.js";

import { HOST, PORT } from "./src/common/configs/environments.js";
import errorHandle from "./src/common/middlewares/errorHandle.js";
import setupSwagger from "./src/common/configs/swagger-config.js";
import cors from "cors";

connectDB();

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", /// Chỉ cho phét domain này gọi API
    credentials: true, //cho phép gửi cookie từ client sang server
  })
);

app.use("/api", router);

setupSwagger(app);

app.use(errorHandle);

app.listen(PORT, () => {
  console.log(`Server is running on: http://${HOST}:${PORT}/api`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
