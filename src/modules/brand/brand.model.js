import mongoose from "mongoose";

const brandSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
});
