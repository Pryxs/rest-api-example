import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connect = async () => {
    const url: string | undefined = process.env.DB_URL;
    try {
        if (url) await mongoose.connect(url);
    } catch {
        console.error('Failed to connect database')
    }
}

export default connect
