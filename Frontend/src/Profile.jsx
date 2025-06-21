import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { AiFillHome, AiOutlineVideoCamera, AiOutlineCloudUpload, AiOutlineUser, AiOutlineArrowLeft } from "react-icons/ai";

const DEFAULT_BANNER =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80";
const DEFAULT_AVATAR =
  "https://ui-avatars.com/api/?name=User&background=random&size=128";

export default function Profile() {
  const [user, setUser] = useState({ fullname: "User", email: "" });
  const [posts, setPosts] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch user profile
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) setUser(data.user);
      });

    // Fetch user's videos
    fetch(`${import.meta.env.VITE_API_URL}/videos`)
      .then(res => res.json())
      .then(data => {
        if (data.videos) {
          // Filter videos uploaded by this user
          const userId = user._id;
          setPosts(
            data.videos.filter(
              v => v.uploader === userId || v.uploaderName === user.fullname
            )
          );
        }
      });
    // eslint-disable-next-line
  }, [user.fullname, user._id]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen">
      {/* Banner */}
      <div className="relative h-36 w-full bg-gray-300">
        <img
          src={DEFAULT_BANNER}
          alt="Banner"
          className="object-cover w-full h-full"
        />
        {/* Profile Picture */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-40px] border-4 border-white rounded-full bg-white w-20 h-20 flex items-center justify-center shadow-lg">
          <img
            src={DEFAULT_AVATAR}
            alt="Profile"
            className="rounded-full w-16 h-16 object-cover"
          />
        </div>
      </div>
      {/* User Info */}
      <div className="mt-12 flex flex-col items-center">
        <div className="text-lg font-bold">{user.fullname}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
        <div className="flex gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span className="font-bold">{posts.length}</span>
            <span className="text-xs text-gray-500">Posts</span>
          </div>
        </div>
      </div>
      {/* Posts Grid */}
      <div className="mt-8 px-2 grid grid-cols-3 gap-2">
        {posts.length === 0 && (
          <div className="col-span-3 text-center text-gray-400">No posts yet</div>
        )}
        {posts.map(post => (
          <div
            key={post._id}
            className="aspect-square bg-black rounded overflow-hidden cursor-pointer"
            onClick={() => setSelectedVideo(post.videoUrl)}
          >
            <video
              src={post.videoUrl}
              className="object-cover w-full h-full"
              controls={false}
              muted
            />
          </div>
        ))}
      </div>
      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-black rounded-lg p-2 max-w-xs w-full relative" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 left-2 text-white bg-black bg-opacity-50 rounded-full p-1"
              onClick={() => setSelectedVideo(null)}
            >
              <AiOutlineArrowLeft size={24} />
            </button>
            <video
              src={selectedVideo}
              className="w-full h-auto rounded"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-10 max-w-md mx-auto w-full">
        
        <NavLink
          to="/feed"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-blue-600" : "text-gray-400")
          }
        >
          <AiOutlineVideoCamera size={24} />
          Feed
        </NavLink>
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-blue-600" : "text-gray-400")
          }
        >
          <AiOutlineCloudUpload size={24} />
          Upload
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            "flex flex-col items-center text-xs " +
            (isActive ? "text-blue-600" : "text-gray-400")
          }
        >
          <AiOutlineUser size={24} />
          Profile
        </NavLink>
      </nav>
    </div>
  );
}