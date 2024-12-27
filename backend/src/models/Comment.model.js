import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    text: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  {
    timestamps: true,
  }
);
