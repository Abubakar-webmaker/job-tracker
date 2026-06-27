"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EditJobPage({ params }) {
  const router = useRouter();
  const [form, setForm]     = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get("/jobs").then(res => {
      const job = res.data.find(j => j._id === params.id);
      if (job) setForm(job);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await api.put(`/jobs/${params.id}`, form);
    router.push("/jobs");
  };

  if (!form) return <p className="text-gray-400">Loading...</p>;

  const inputClass = "w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Application</h1>
      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input defaultValue={form.company} placeholder="Company" className={inputClass}
            onChange={e => setForm({ ...form, company: e.target.value })} />
          <input defaultValue={form.position} placeholder="Position" className={inputClass}
            onChange={e => setForm({ ...form, position: e.target.value })} />
        </div>
        <input defaultValue={form.location} placeholder="Location" className={inputClass}
          onChange={e => setForm({ ...form, location: e.target.value })} />
        <select defaultValue={form.status} className={inputClass}
          onChange={e => setForm({ ...form, status: e.target.value })}>
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>
        <input defaultValue={form.resumeLink} placeholder="Resume Link" className={inputClass}
          onChange={e => setForm({ ...form, resumeLink: e.target.value })} />
        <textarea defaultValue={form.notes} placeholder="Notes" rows={3} className={inputClass}
          onChange={e => setForm({ ...form, notes: e.target.value })} />
        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-3 rounded-xl font-medium transition">
          {loading ? "Updating..." : "Update Application"}
        </button>
      </form>
    </div>
  );
}