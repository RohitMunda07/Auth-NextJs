import { getDataFromToken } from "@/src/helper/getDataFromToken";
import User from "@/src/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/src/dbConnect/dbConnect";

connectDB();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        const user = await User.findById(userId).select("-password");

        if (!user) {
            return NextResponse.json(
                { error: "User Not Found" }
            )
        }

        return NextResponse.json(
            {
                message: "Fetch User SuccessFully",
                data: user
            }
        )
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 400 }
        )
    }
}