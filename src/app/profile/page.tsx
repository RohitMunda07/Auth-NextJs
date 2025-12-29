"use client"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function profil() {
    const router = useRouter();
    const handleLogout = async () => {
        try {
            const response = await axios.get("/api/uers/logout");
            console.log(response);
            router.push("/login");
        } catch (error: any) {
            console.log("Error while logout", error.message);
        }
    }

    const currentUser = async () => {
        try {
            console.log("before me")
            const response = await axios.get("/api/uers/me",{
                withCredentials: true
            });
            console.log("Current User:", response.data);
        } catch (error: any) {
            console.log("Error while getting current user", error.message);
        }
    }

    useEffect(() => {
        currentUser();
    }, [])

    return (
        <div className="w-full h-screen flex justify-center items-center">
            <h1 className="text-2xl">Outer Profile</h1>
            <div>
                <button
                    onClick={handleLogout}
                    className="bg-blue-600 cursor-pointer">logout</button>
            </div>
        </div>
    )
}