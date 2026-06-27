"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

const STATUS_COLORS = {
  Applied:   "bg-blue-500/20 text-blue-400",
  Interview: "bg-yellow-500/20 text-yellow-400",
  Offer:     "bg-green-500/20 text-green-400",
  Rejected:  "bg-red-500/20 text-red-400",
};

export default function JobsPage() {
  const [jobs, setJobs]     = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/jobs").then(res => {
      setJobs(res.data);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "All" ? jobs : jobs.filter(j => j.status === filter);

  const handleDelete = async (id) => {
    if (!confirm("Delete this application?")) return;
    await api.delete(`/jobs/${id}`);
    setJobs(jobs.filter(j => j._id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Applications</h1>
        <Link href="/jobs/add" className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm transition">
          + Add Job
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", "Applied", "Interview", "Offer", "Rejected"].map(s => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-sm transition ${
              filter === s
                ? "bg-indigo-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}>
            {s}
          </button>
        ))}
      </div>

      {/* Jobs List */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-5xl mb-4">📋</p>
          <p>No jobs found.{" "}
            <Link href="/jobs/add" className="text-indigo-400 hover:underline">Add one!</Link>
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map(job => (
            <div key={job._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex items-center justify-between hover:border-gray-700 transition">
              <div>
                <h2 className="font-semibold text-white text-lg">{job.position}</h2>
                <p className="text-gray-400 text-sm">
                  {job.company}{job.location && ` · ${job.location}`}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  {new Date(job.appliedDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[job.status]}`}>
                  {job.status}
                </span>
                <Link href={`/jobs/${job._id}`}
                  className="text-indigo-400 hover:text-indigo-300 text-sm transition">
                  Edit
                </Link>
                <button onClick={() => handleDelete(job._id)}
                  className="text-red-400 hover:text-red-300 text-sm transition">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}