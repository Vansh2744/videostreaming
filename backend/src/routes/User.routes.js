import { signup, signin, getUser, getActiveUser } from "../controllers/User.controllers.js";
import { protectedRoute } from "../middlewares/protectedRoute.js";
import { Router } from "express";

const router = Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/getUser/:userId").get(getUser);
router.route("/getActiveUser").get(protectedRoute, getActiveUser);

export default router;
