import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsValid(false);
      return;
    }
    // Optional: Validate token with backend
    fetch(`${import.meta.env.VITE_API_URL}/auth/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setIsValid(res.ok))
      .catch(() => setIsValid(false));
  }, []);

  if (isValid === null) {
    // Loading state while checking token
    return (
      <div className="flex justify-center items-center h-screen">
        Checking authentication...
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/signup" replace />;
  }

  return <Outlet />;
}