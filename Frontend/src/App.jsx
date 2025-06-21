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
    <div className="max-w-md mx-auto min-h-screen flex flex-col justify-center p-4 relative bg-white">
      <div className="absolute top-4 right-4">
        {/* <img src="/logo.png" alt="Logo" className="w-10 h-10" /> */}
      </div>
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Video Sharing App</h1>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition"
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
