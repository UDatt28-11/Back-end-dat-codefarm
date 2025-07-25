// middleware/upload.js
import multer from "multer";

const storage = multer.memoryStorage(); // dùng memory để lấy buffer
const upload = multer({ storage });

export default upload;
