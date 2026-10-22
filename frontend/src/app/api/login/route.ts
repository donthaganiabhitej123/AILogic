import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../lib/api";

export async function POST(request: NextRequest) {
try {
    const { email, password } = await request.json();

    const result = await api.post("/auth/login", {email,
password,
    });

    const token = result.data.accessToken;

    if (!token) {
return NextResponse.json(
        { success: false, message: "Access token missing" },
        { status: 502 }
);
    }

    const response = NextResponse.json({
    success: true,
    message: "Login successful",
    data: result.data.data,
    });

    response.cookies.set("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60,
    });

    return response;
} catch (error: unknown) {
    if (axios.isAxiosError(error)) {
    return NextResponse.json(
        {
        success: false,
    message: error.response?.data?.message ?? "Login failed",
        },
        { status: error.response?.status ?? 502 }
);
    }

    return NextResponse.json(
{ success: false, message: "Internal server error" },
{ status: 500 }
    );
  }
}