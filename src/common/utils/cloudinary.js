import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv";
import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/environments.js";

dotenv.config();

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// 🧩 Upload 1 file (nhận vào file object như từ multer)
export const uploadSingleFile = (file, folder = "uploads") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (err, result) => {
        if (err) return reject(err);
        resolve({
          downloadUrl: result.secure_url,
          imageRef: result.public_id,
        });
      }
    );
    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  });
};

// 🧩 Upload nhiều file (danh sách file object)
export const uploadMultipleFiles = async (files, folder = "uploads") => {
  const uploads = files.map((file) => uploadSingleFile(file, folder));
  return Promise.all(uploads); // Trả về mảng các URL
};
