import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        filePath,
        {
          resource_type: "video",
          folder: "videos",
          chunk_size: 6000000,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw new Error("Failed to upload video to Cloudinary.");
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

export const uploadThumbnail = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    return result;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw new Error("Failed to upload video to Cloudinary.");
  } finally {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};
