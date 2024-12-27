import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized User having no token" });
    }
    

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken) {
      return res.status(400).json({ message: "Invalid token" });
    }

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
