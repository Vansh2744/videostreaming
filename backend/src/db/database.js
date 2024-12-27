import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `${process.env.DATABASE_URI}/videostreaming`
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Unable to connect database", error.message);
  }
};

export default connectDB;
