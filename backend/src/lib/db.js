import mongoose from "mongoose"
import { ENV } from "./env.js"

export const connectDB = async () => {
    try {
        const { MONGO_URI } = ENV;
        if (!MONGO_URI) throw new Error("isn't step up");
        const con = await mongoose.connect(ENV.MONGO_URI)
        console.log("mongobd connected: ", con.connection.host)
    }
    catch (error) {
        console.error("error: ", error)
        process.exit(1);
    }
}