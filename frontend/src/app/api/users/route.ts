
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../lib/api";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Please log in again" },
      { status: 401 }
    );
  }

  try {
    const result = await api.get("/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(result.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status ?? 502;

      return NextResponse.json(
        {
          success: false,
          message:
            status === 401
              ? "Session expired. Please log in again."
              : "Failed to retrieve users",
        },
        { status }
      );
    }

    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
