"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function signUp() {
    const [user, setUser] = React.useState({
        email: "",
        password: ""
    })

    const onLogin = async () => {

    }

    return (
        <div className="w-full h-screen flex flex-col gap-y-5 items-center justify-center">
            <h1 className="mb-3">Login</h1>
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
                >Login</button>
                <Link href="/signUp">Go to Sign up Page</Link>
            </div>
        </div>
    )
}