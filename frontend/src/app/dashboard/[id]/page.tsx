
"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface UserResponse {
  success: boolean;
  data: User;
  message?: string;
}

export default function UserDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const response = await axios.get<UserResponse>(
          `/api/users/${encodeURIComponent(id)}`
        );

        if (active) {
          setUser(response.data.data);
        }
      } catch (error: unknown) {
        if (!active) return;

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            router.replace("/login");
            return;
          }

          setError(
            error.response?.data?.message ?? "Failed to load user."
          );
        } else {
          setError("Something went wrong.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [id, router]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-700">Loading user...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 p-8">
        <p className="text-red-700">{error}</p>
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 rounded-lg bg-gray-800 px-4 py-2 text-white"
        >
          Back to Dashboard
        </button>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => router.push("/dashboard")}
          className="mb-6 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          ← Back to Dashboard
        </button>

        <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">
            User Details
          </h1>

          <div className="mt-6 space-y-5">
            <div>
              <p className="text-sm font-medium text-gray-500">
                User ID
              </p>
              <p className="mt-1 text-lg font-semibold text-gray-900">
                {user.id}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500">
                Email Address
              </p>
              <p className="mt-1 break-all text-lg text-gray-800">
                {user.email}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
