// dependencies
import mongoose from "mongoose";

// user schema
const userSchema = mongoose.Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
    },
    gender: {
        type: String,
        default: null,
    },
    age: {
        type: Number,
        default: null,
    },
    location: {
        type: String,
        default: null,
    }
  },
  {
    timestamps: true,
  }
);

// export mongoose model
export const userModel = mongoose.model("User", userSchema);
