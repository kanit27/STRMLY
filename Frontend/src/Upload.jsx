import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineVideoCamera, AiOutlineCloudUpload, AiOutlineUser } from "react-icons/ai";

export default function Upload({ token }) {
  const [form, setForm] = useState({ title: "", description: "", video: null });
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    if (e.target.name === "video") {
      setForm({ ...form, video: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg(""); setError(""); setLoading(true);
    const api = import.meta.env.VITE_API_URL;
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("description", form.description);
    fd.append("video", form.video);

    try {
      const res = await fetch(`${api}/videos/upload`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json();
      if (res.ok) {
        setMsg("Upload successful!");
        setForm({ title: "", description: "", video: null }); // Clear inputs
        // Also clear the file input value
        if (document.getElementById("video-input")) {
          document.getElementById("video-input").value = "";
        }
      } else setError(data.error || "Upload failed");
    } catch (err) {
      setError("Network error");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-10 max-w-md mx-auto w-full">
        
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-red-600" : "text-gray-400")
          }
        >
          <AiOutlineVideoCamera size={24} />
          Feed
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-red-600" : "text-gray-400")
          }
        >
          <AiOutlineCloudUpload size={24} />
          Upload
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-red-600" : "text-gray-400")
          }
        >
          <AiOutlineUser size={24} />
          Profile
        </NavLink>
      </nav>
      <form className="bg-white p-4 rounded shadow flex flex-col gap-3" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-2">Upload Video</h2>
        <input
          name="title"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={handleChange}
        />
        <input
          id="video-input"
          name="video"
          type="file"
          accept="video/mp4"
          className="border p-2 rounded"
          onChange={handleChange}
          required
        />
        {loading && (
          <div className="flex items-center justify-center py-2">
            <svg className="animate-spin h-6 w-6 text-blue-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
            </svg>
            <span>Uploading...</span>
          </div>
        )}
        {msg && !loading && <div className="text-green-600 text-sm">{msg}</div>}
        {error && !loading && <div className="text-red-500 text-sm">{error}</div>}
        <button className="bg-red-600 text-white rounded py-2 font-bold" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}