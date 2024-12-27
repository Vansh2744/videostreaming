import { uploadOnCloudinary, uploadThumbnail } from "../utils/cloudinary.js";
import Video from "../models/Video.model.js";
import User from "../models/User.model.js";

export const createVideo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate title and description
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }
    
    // Validate video file
    if (!req.files) {
      return res.status(400).json({ message: "Video and thumbnail file is required." });
    }

    // Optional: Add file type validation (e.g., only accept certain video formats)
    const validMimeTypes = ["video/mp4", "video/mkv", "video/avi"];
    if (!validMimeTypes.includes(req.files.video[0].mimetype)) {
      return res
        .status(400)
        .json({ message: "Invalid file type. Only videos are allowed." });
    }

    const videoFilePath = req.files?.video[0].path;
    const thumbnailFilePath = req.files?.thumbnail[0].path;

    // Upload video to Cloudinary
    const video = await uploadOnCloudinary(videoFilePath);
    const thumbnail = await uploadThumbnail(thumbnailFilePath);


    if (!video) {
      return res
        .status(500)
        .json({ message: "Failed to upload video to Cloudinary." });
    }

    const userName = await User.findById(req.user.userId).select("avatar name");
    
   
    if (!userName) {
      return res
        .status(404)
        .json({ message: "User not found." });
    }


    const uploadedVideo = await Video.create({
      title,
      description,
      url: video.url,
      thumbnail: thumbnail.url,
      createdBy: {
        avatar: userName.avatar,
        name: userName.name,
      }, // Associate the video with the authenticated user
    });

    const videoId = uploadedVideo._id;

    const user = await User.findById(req.user.userId);
    user.createdVideos.push(videoId);
    await user.save();

    return res
      .status(200)
      .json({ message: "Video uploaded successfully.", video: uploadedVideo });
  } catch (error) {
    console.error("Error uploading video:", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getVideos = async (req, res) => {
  try {
    const videos = await Video.find();

    if (!videos) {
      return res.status(404).json({ message: "No videos found" });
    }

    return res.status(200).json({ videos });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
