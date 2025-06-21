import React, { useState } from "react";

export default function VideoGrid({ videos }) {
  const [selectedVideo, setSelectedVideo] = useState(null);

  return (
    <>
      <div className="px-2 grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
        {videos.length === 0 && (
          <div className="col-span-2 text-center text-gray-400">No videos yet</div>
        )}
        {videos.map(v => (
          <div
            key={v._id}
            className="aspect-[9/16] bg-black rounded overflow-hidden cursor-pointer relative group"
            onClick={() => setSelectedVideo(v.videoUrl)}
          >
            <video
              src={v.videoUrl}
              className="object-cover w-full h-full"
              controls={false}
              muted
              poster="https://dummyimage.com/300x500/000/fff&text=Video"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1">
              <div className="text-white text-xs font-semibold truncate">{v.title}</div>
              <div className="text-gray-300 text-[10px] truncate">
                By {v.uploaderName}
              </div>
            </div>
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
              <svg width="24" height="24" fill="none" stroke="currentColor"><path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
    </>
  );
}