import express from "express";

import router from "./src/routes/index.js";
import connectDB from "./src/common/configs/connectDB.js";

import { HOST, PORT } from "./src/common/configs/environments.js";
import errorHandle from "./src/common/middlewares/errorHandle.js";
import setupSwagger from "./src/common/configs/swagger-config.js";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", router);

setupSwagger(app);

app.use(errorHandle);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on: http://${HOST}:${PORT}/api`);
  console.log(`Swagger Docs available at http://${HOST}:${PORT}/api-docs`);
});
