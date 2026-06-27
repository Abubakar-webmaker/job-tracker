"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { user } = useAuth();
  const router   = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard");
  }, [user]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center">
      <div className="inline-block bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-4 py-1.5 rounded-full text-sm mb-6">
        Track. Apply. Get Hired.
      </div>
      <h1 className="text-5xl font-bold text-white mb-4 leading-tight">
        Your Job Search,<br />
        <span className="text-indigo-400">Organized.</span>
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Track every application, interview, and offer in one clean dashboard.
      </p>
      <div className="flex gap-4">
        <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-medium transition">
          Get Started Free
        </Link>
        <Link href="/login" className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-xl font-medium transition">
          Sign In
        </Link>
      </div>
    </div>
  );
}