import createError from "../utils/error.js";

const valiBodyRequest = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.data = data;
    next();
  } catch (err) {
    const error = err.errors[0];
    return res
      .status(400)
      .json({ "Validate body request ": `${error.path}: ${error.massage}` });
  }
};
export default valiBodyRequest;
