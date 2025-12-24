import mongoose from "mongoose";

export async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB Connected Successfully");
        })

        connection.on("error", () => {
            console.log("MongoDB Connection Error");
            process.exit();
        })
        
    } catch (error) {
        console.log("Something went wrong while connecting to MogoDB");
        console.log(error);
    }
}