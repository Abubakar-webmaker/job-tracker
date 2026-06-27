"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function AddJobPage() {
  const router = useRouter();
  const [form, setForm]   = useState({
    company: "", position: "", location: "",
    status: "Applied", notes: "", resumeLink: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.post("/jobs", form);
    router.push("/jobs");
  };

  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Add New Application</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="Company *" required className={inputClass}
            onChange={e => setForm({ ...form, company: e.target.value })} />
          <input placeholder="Position *" required className={inputClass}
            onChange={e => setForm({ ...form, position: e.target.value })} />
        </div>
        <input placeholder="Location" className={inputClass}
          onChange={e => setForm({ ...form, location: e.target.value })} />
        <select className={inputClass}
          onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input placeholder="Resume Link (optional)" className={inputClass}
          onChange={e => setForm({ ...form, resumeLink: e.target.value })} />
        <textarea placeholder="Notes (optional)" rows={3} className={inputClass}
          onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3 rounded-xl font-medium transition">
          {loading ? "Saving..." : "Save Application"}
        </button>
      </form>
    </div>
  );
}