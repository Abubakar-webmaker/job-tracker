"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer
} from "recharts";

const COLORS = {
  Applied:   "#6366f1",
  Interview: "#f59e0b",
  Offer:     "#10b981",
  Rejected:  "#ef4444",
};

export default function DashboardPage() {
  const { user }    = useAuth();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs").then(res => setJobs(res.data));
  }, []);

  const statusCount = ["Applied", "Interview", "Offer", "Rejected"].map(s => ({
    name: s,
    value: jobs.filter(j => j.status === s).length,
  }));

  const recentJobs = jobs.slice(0, 5);

  const STATUS_COLORS = {
    Applied:   "bg-blue-500/20 text-blue-400",
    Interview: "bg-yellow-500/20 text-yellow-400",
    Offer:     "bg-green-500/20 text-green-400",
    Rejected:  "bg-red-500/20 text-red-400",
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-1">
        Welcome back, {user?.name?.split(" ")[0]} 👋
      </h1>
      <p className="text-gray-400 text-sm mb-8 capitalize">
        {user?.role === "recruiter" ? "Recruiter Dashboard" : "Job Seeker Dashboard"}
      </p>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {statusCount.map(s => (
          <div key={s.name} className="bg-gray-900 border border-gray-800 rounded-2xl p-4">
            <p className="text-gray-400 text-sm">{s.name}</p>
            <p className="text-3xl font-bold mt-1" style={{ color: COLORS[s.name] }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-semibold mb-4 text-gray-300">Status Breakdown</h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={statusCount} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {statusCount.map(s => <Cell key={s.name} fill={COLORS[s.name]} />)}
              </Pie>
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
          <h2 className="font-semibold mb-4 text-gray-300">Applications Overview</h2>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={statusCount}>
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: "8px" }}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {statusCount.map(s => <Cell key={s.name} fill={COLORS[s.name]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
        <h2 className="font-semibold mb-4 text-gray-300">Recent Applications</h2>
        {recentJobs.length === 0 ? (
          <p className="text-gray-500 text-sm">No applications yet.</p>
        ) : (
          <div className="space-y-3">
            {recentJobs.map(job => (
              <div key={job._id}
                className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <p className="font-medium text-sm">{job.position}</p>
                  <p className="text-gray-500 text-xs">{job.company}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[job.status]}`}>
                  {job.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}