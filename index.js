import express from "express";

import router from "./src/router/index.js";
import connectDB from "./src/common/configs/connectDB.js";

import { HOST, PORT } from "./src/common/configs/enviroments.js";
import errorHandle from "./src/common/middlewares/errorHandle.js";

connectDB();

const app = express();

app.use(express.json());

app.use("/api", router);
app.use(errorHandle);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on: http://${HOST}:${PORT}/api`);
});
