import createError from "../utils/error";

const valiBodyRequest = (schema) => (req, res, next) => {
  try {
    const data = schema.parse(req.body);
    req.data = data;
    next();
  } catch (err) {
    const error = err.errors[0];
    return res
      .status(400)
      .json({ "Validate body request ": `${error.path}: ${error.message}` });
  }
};
export default valiBodyRequest;
