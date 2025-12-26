import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/user.model.js";
import { connectDB } from "../../../../dbConnect/dbConnect";
import jwt from "jsonwebtoken";

connectDB();

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User Not Found" },
                { status: 404 }
            )
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return NextResponse.json(
                { error: "Invalid Password" },
                { status: 403 }
            )
        }

        // verification token
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email,
        }

        // creating verification token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

        const response = NextResponse.json(
            {
                message: "User LoggedIn Successfully",
                user,
            },
            { status: 200 },
        )

        response.cookies.set("token", token, {
            httpOnly: true,
            // secure: true,
            // sameSite: false
        })
        
        return response;

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}