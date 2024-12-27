import { createVideo, getVideos } from "../controllers/Video.controllers.js";
import { Router } from "express";
import { upload } from "../middlewares/multer.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";

const router = Router();

router
  .route("/uploadVideo")
  .post(protectedRoute, upload.fields([{ name: "video" }, { name: "thumbnail" }]), createVideo);

router.route("/getAllVideos").get(getVideos);

export default router;
