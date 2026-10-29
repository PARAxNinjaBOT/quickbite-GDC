import mongoose from "mongoose";

const getMongoUri = () => {
  const uri = process.env.MONGO_URI?.trim().replace(/^['"]|['"]$/g, "");

  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error('MONGO_URI must start with "mongodb://" or "mongodb+srv://"');
  }

  return uri;
};

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(getMongoUri());
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
