import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "../../../../models/user.model.js";
import { connectDB } from "../../../../dbConnect/dbConnect";

connectDB();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { userName, email, password } = reqBody;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            NextResponse.json(
                { error: "User already exist" },
                { status: 400 },
            )
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await new User({
            userName,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        console.log(savedUser);

        return NextResponse.json({
            message: "User Created Successfully",
            status: 201,
            savedUser
        })

    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}