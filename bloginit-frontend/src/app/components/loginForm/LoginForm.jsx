import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserId, setProfilePic } = useBackendStatus();
  const router = useRouter();
  const backendStatus = useBackendStatus();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:4000/login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store the token and user details in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("profilePic", user.profile_pic || "");

        // Update the context state
        setIsLoggedIn(true);
        setUserId(user.user_id);
        setAuthToken(user.token);
        setProfilePic(user.profile_pic);

        console.log("Logged in successfully!");

        // Redirect to the user's profile page
        if (backendStatus.isBackendUp) {
          router.push(`/user/${user.user_id}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials.");
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
    </div>
  );
};

export default LoginForm;
