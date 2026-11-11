import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected, DB Host ${conn.connection.host}`)
    } catch (error) {
        console.log(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;