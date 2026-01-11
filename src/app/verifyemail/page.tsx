"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import axios from "axios";

export default function verifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const res = await axios.post("/api/uers/verifyemail", { token });
            console.log(res.data);
            setVerified(true);
        } catch (error: any) {
            setError(true);
            console.log(error.response.data);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "");
    })

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    }, [token])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md text-center">

                {!verified && !error && (
                    <>
                        <h1 className="mb-4 text-2xl font-semibold text-gray-800">
                            Verifying your email
                        </h1>
                        <p className="text-gray-600">
                            Please wait while we verify your email address...
                        </p>
                        <div className="mt-6 flex justify-center">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    </>
                )}

                {verified && (
                    <>
                        <h1 className="mb-4 text-2xl font-semibold text-green-600">
                            Email Verified 🎉
                        </h1>
                        <p className="mb-6 text-gray-600">
                            Your email has been successfully verified. You can now log in.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block rounded bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700"
                        >
                            Go to Login
                        </Link>
                    </>
                )}

                {error && (
                    <>
                        <h1 className="mb-4 text-2xl font-semibold text-red-600">
                            Verification Failed ❌
                        </h1>
                        <p className="mb-6 text-gray-600">
                            The verification link is invalid or has expired.
                        </p>
                        <Link
                            href="/login"
                            className="inline-block rounded bg-gray-700 px-6 py-2 text-white transition hover:bg-gray-800"
                        >
                            Back to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
