import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn } = useBackendStatus();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://your-backend-url.com/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
        setError("");
        alert("Logged in successfully!");
      }
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground my-[5vw]">
      <h2 className="text-[3vw] mb-[1vw]">Login to BlogiNIT</h2>
      <input
        type="email"
        placeholder="Email"
        className="input input-bordered w-full max-w-xs my-2 bg-accent"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input input-bordered w-full max-w-xs my-2 bg-accent"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        onClick={handleLogin}
        className="btn btn-foreground w-full max-w-xs my-2"
      >
        Login
      </button>
      <Link href="/signup" className="btn btn-foreground w-full max-w-xs">
        Create an account
      </Link>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LoginForm;
