import mongoose from "mongoose"

export const connectDB = async () => 
{
    try
    {
        const {MONGO_URI} = process.env;
        if(!MONGO_URI) throw new Error ("MONGO_URI is not set");
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log("mongobd connected: ", con.connection.host)
    }
    catch(error)
    {
            console.error("error: ", error)
            process.exit(1);
    }
}