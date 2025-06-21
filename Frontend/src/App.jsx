import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SignupLogin from "./SignUpLogin";
import Upload from "./Upload";
import Feed from "./Feed";
import './App.css';
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

function GetStarted() {
  const navigate = useNavigate();
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center p-4 relative bg-red-500 ">
      <div className="absolute top-4 right-4">
        {/* <img src="/logo.png" alt="Logo" className="w-10 h-10" /> */}
      </div>
      <div className="flex flex-col  w-full h-full">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D0BAQGAYLPihQPxUg/company-logo_200_200/B4DZdLHKH6HkAM-/0/1749311858286/boom_socialmedia_logo?e=1755734400&v=beta&t=mMzrAdWVQfP5KoVK4OgRSPkYamxCAcRGbvkQSPAdwXw"
          alt="Logo"
          className="w-24 h-24 absolute top-10 left-10 mb-6 rounded-full shadow-lg"
        />
        <h1 className="text-3xl absolute top-16  left-40 font-bold mb-6 text-center text-white">
          STRMLY
        </h1>
        <p className="text-lg absolute top-24 left-40 text-white mb-8 text-center">
          Decentralized entertainment.
        </p>
        <button
          className="bg-black text-white px-6 py-3 rounded-full absolute bottom-20 left-36 font-semibold text-lg shadow hover:bg-blue-700 transition"
          onClick={() => navigate("/signup")}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleLogin = (jwt) => {
    setToken(jwt);
    localStorage.setItem("token", jwt);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/signup" element={<SignupLogin onLogin={handleLogin} />} />
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/upload" element={<Upload token={token} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
