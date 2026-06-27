"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-400 tracking-tight">
        JobTracker
      </Link>

      <div className="flex items-center gap-6 text-sm">
        {user ? (
          <>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition">
              Dashboard
            </Link>
            <Link href="/jobs" className="text-gray-300 hover:text-white transition">
              Jobs
            </Link>
            <Link href="/jobs/add" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-lg transition">
              + Add Job
            </Link>
            <span className="text-gray-500 text-xs border border-gray-700 px-2 py-1 rounded-lg">
              {user.role}
            </span>
            <button onClick={logout} className="text-gray-400 hover:text-red-400 transition">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="text-gray-300 hover:text-white transition">
              Login
            </Link>
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-1.5 rounded-lg transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}