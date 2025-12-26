"use client";

import React, { use, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";


export default function signUp() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [disableButton, setDisableButton] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/uers/login", user);
            console.log("Login response", response.data);
            toast.success("Login Successfull");
            router.push("/profile");

        } catch (error: any) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [user])

    return (
        <div className="w-full h-screen flex flex-col gap-y-5 items-center justify-center">
            <h1 className="mb-3">{loading ? "Processing" : "Login"}</h1>
            <div className="space-x-3 space-y-3">
                <div className="space-x-3">
                    <label htmlFor="email">Email</label>
                    <input
                        className="border-white bg-white w-full text-black rounded-md px-2 py-1 focus:outline-none"
                        id="email"
                        type="text"
                        name="email"
                        value={user.email}
                        placeholder="email"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </div>
                <div className="space-x-3">
                    <label htmlFor="username">Password</label>
                    <input
                        className="border-white bg-white w-full text-black rounded-md px-2 py-1 focus:outline-none"
                        id="password"
                        type="text"
                        name="password"
                        value={user.password}
                        placeholder="password"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                </div>

                <button
                    onClick={onLogin}
                    className="text-2xl bg-blue-600 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                >{disableButton ? "No Login" : "Login"}</button>
                <Link href="/signUp">Go to Sign up Page</Link>
            </div>
        </div>
    )
}