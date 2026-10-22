
"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
}

interface UsersResponse {
  success: boolean;
  data: User[];
  message?: string;
}

export default function DashboardPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await axios.get<UsersResponse>("/api/users");

        if (active) {
          setUsers(response.data.data);
        }
      } catch (error: unknown) {
        if (!active) return;

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            router.replace("/login");
            return;
          }

          setError(
            error.response?.data?.message ?? "Failed to load users."
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

    void loadUsers();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-base font-medium text-gray-700">
          Loading users...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
        <p className="rounded-lg border border-red-200 bg-white p-5 text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            View registered users.
          </p>
        </div>

        {/* Total Users Card */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">
            Total Users
          </p>
          <p className="mt-2 text-3xl font-bold text-blue-700">
            {users.length}
          </p>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Registered Users
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-800">
              <thead className="bg-gray-100 text-xs uppercase tracking-wider text-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    Email Address
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-6 py-10 text-center text-gray-500"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="transition-colors hover:bg-blue-50"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
  <button
    type="button"
    onClick={() => router.push(`/dashboard/${user.id}`)}
    className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
  >
    {user.id}
  </button>
</td>
                      <td className="px-6 py-4 text-gray-700">
                        {user.email}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-3">
            <p className="text-sm text-gray-600">
              Showing {users.length} users
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
