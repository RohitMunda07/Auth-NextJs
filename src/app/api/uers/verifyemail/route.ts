import { connectDB } from "@/src/dbConnect/dbConnect";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();

        const { token } = reqBody;
        console.log("Token:", token);

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        })

        if (!user) {
            return NextResponse.json(
                { error: "Invalid Token" },
                { status: 400 }
            )
        }

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email Verified Successfull",
            success: true
        })


    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}