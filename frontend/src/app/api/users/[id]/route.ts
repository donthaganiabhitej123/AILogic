
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { api } from "../../../lib/api";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: NextRequest,
  context: RouteContext
) {
  const token = request.cookies.get("accessToken")?.value;

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Please log in again" },
      { status: 401 }
    );
  }

  const { id } = await context.params;

  if (!/^[1-9]\d*$/.test(id)) {
    return NextResponse.json(
      { success: false, message: "Invalid user ID" },
      { status: 400 }
    );
  }

  try {
    const result = await api.get(`/users/${id}`, {
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
            status === 404
              ? "User not found"
              : status === 401
                ? "Session expired. Please log in again."
                : "Failed to retrieve user",
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
