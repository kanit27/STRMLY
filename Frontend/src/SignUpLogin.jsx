import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupLogin({ onLogin }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ fullname: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    const api = import.meta.env.VITE_API_URL;
    const signupUrl = `${api}/auth/signup`;
    const loginUrl = `${api}/auth/login`;
    const signupBody = { fullname: form.fullname, email: form.email, password: form.password };
    const loginBody = { email: form.email, password: form.password };

    try {
      if (isSignup) {
        // First, sign up
        const signupRes = await fetch(signupUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(signupBody),
        });
        const signupData = await signupRes.json();
        if (!signupRes.ok) {
          setError(signupData.error || "Signup error");
          return;
        }
        // Then, log in
        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginBody),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          onLogin(loginData.token);
          navigate("/feed");
        } else {
          setError(loginData.error || "Login error after signup");
        }
      } else {
        // Login flow
        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loginBody),
        });
        const loginData = await loginRes.json();
        if (loginRes.ok) {
          onLogin(loginData.token);
          navigate("/feed");
        } else {
          setError(loginData.error || "Login error");
        }
      }
    } catch {
      setError("Network error");
    }
  };

  return (
    <form className="bg-white p-4 rounded shadow flex flex-col gap-3" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-2">{isSignup ? "Sign Up" : "Login"}</h2>
      {isSignup && (
        <input
          name="fullname"
          placeholder="Full Name"
          className="border p-2 rounded"
          value={form.fullname}
          onChange={handleChange}
          required
        />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        className="border p-2 rounded"
        value={form.password}
        onChange={handleChange}
        required
      />
      {error && <div className="text-red-300 text-sm">{error}</div>}
      <button className="bg-red-600 text-white rounded py-2 font-bold">{isSignup ? "Sign Up" : "Login"}</button>
      <button
        type="button"
        className="text-blue-600 underline text-sm"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "Already have an account? Login" : "No account? Sign up"}
      </button>
    </form>
  );
}