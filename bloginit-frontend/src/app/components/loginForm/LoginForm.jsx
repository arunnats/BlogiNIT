import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoggedIn, setUserId, setProfilePic, setAuthToken, isBackendUp } =
    useBackendStatus();
  const router = useRouter();

  // Helper function to sanitize inputs
  const sanitizeInput = (input) => {
    return input.replace(/[^\w.@-]/g, ""); // Allow only alphanumeric, dots, @, hyphens, and underscores
  };

  // Input validation
  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (email.length > 30) {
      alert("Email should not exceed 30 characters.");
      return false;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return false;
    }
    if (password.length > 50) {
      alert("Password should not exceed 50 characters.");
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!validateInputs()) return;

    try {
      const response = await axios.post("http://localhost:4000/login", {
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (response.status === 200) {
        const { token, user } = response.data;
        console.log(response);
        console.log(token);

        // Store the token and user details in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("profilePic", user.profile_pic || "");

        // Update the context state
        setIsLoggedIn(true);
        setUserId(user.user_id);
        setAuthToken(token);
        setProfilePic(user.profile_pic);

        console.log("Logged in successfully!");

        // Redirect to the user's profile page
        if (isBackendUp) {
          router.push(`/user/${user.user_id}`);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Login failed. Please check your credentials and try again.");
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
