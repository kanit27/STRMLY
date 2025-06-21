import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineVideoCamera, AiOutlineCloudUpload, AiOutlineUser } from "react-icons/ai";

export default function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL;
    fetch(`${api}/videos`)
      .then(res => res.json())
      .then(data => {
        setVideos(data.videos || []);
        setLoading(false);
      });
  }, []);

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
      <h2 className="text-xl font-bold mb-2">Video Feed</h2>
      {loading && <div>Loading...</div>}
      <div className="flex flex-col gap-4">
        {videos.map(v => (
          <div key={v._id} className="bg-white rounded shadow p-3 flex flex-col gap-2">
            <div className="font-bold">{v.title}</div>
            <video controls src={v.videoUrl} className="w-full rounded" />
            <div className="text-xs text-gray-500">
              By {v.uploaderName} • {new Date(v.uploadDate).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}