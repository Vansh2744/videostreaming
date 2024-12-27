import User from "../models/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken = async (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRY,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, options);

    return token;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, name, email, password } = req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const user = await User.findOne({ email }).select(
      "_id username name email"
    );

    return res
      .status(201)
      .json({ message: "User created successfully", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = createToken(existingUser._id, res);

    console.log(token);

    const user = await User.findOne({ email }).select(
      "_id username name email"
    );

    return res.status(200).json({ message: "Login successful", user: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "User Id is required" });
    }

    const user = await User.findById(userId).select("_id username name email");
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getActiveUser = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
