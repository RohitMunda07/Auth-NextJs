"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function signUp() {
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignUp = async () => {

    }

    return (
        <div className="w-full h-screen flex flex-col gap-y-5 items-center justify-center">
            <h1 className="mb-3">Sign Up</h1>
            <div className="space-x-3 space-y-3">
                <div className="space-x-3">
                    <label htmlFor="username">Username</label>
                    <input
                        className="border-white w-full bg-white text-black rounded-md px-2 py-1 focus:outline-none"
                        id="username"
                        type="text"
                        name="username"
                        value={user.username}
                        placeholder="Username"
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                </div>
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
                    onClick={onSignUp}
                    className="text-2xl bg-blue-600 rounded-lg px-2 py-1 focus:outline-none cursor-pointer"
                >Sign up</button>
                <Link href="/login">Go to Login Page</Link>
            </div>
        </div>
    )
}