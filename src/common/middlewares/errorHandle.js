import createResponse from "../utils/response.js";

const errorHandle = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.statusCode.json(createResponse(false, statusCode, message));
};
export default errorHandle;
