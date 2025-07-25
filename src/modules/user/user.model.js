import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true, // ✅ Sửa lại dòng này
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true, // ✅ Sửa lại dòng này
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "superadmin"],
      default: "customer",
    },
    address: {
      type: String,
      default: "",
    },
    bios: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/009/292/244/large_2x/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    isVerified: { type: Boolean, default: false },
    socal: {
      facebook: {
        type: String,
        default: "",
      },
      instagram: {
        type: String,
        default: "",
      },
      twitter: {
        type: String,
        default: "",
      },
    },
  },
  { versionKey: false, timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
