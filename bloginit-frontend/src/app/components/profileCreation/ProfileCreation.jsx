import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

const ProfileCreation = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const backendStatus = useBackendStatus();
  const router = useRouter();

  // Helper function to sanitize inputs
  const sanitizeInput = (input) => {
    return input.replace(/[^\w.@-]/g, ""); // Allow only alphanumeric, dots, @, hyphens, and underscores
  };

  // Input validation
  const validateInputs = () => {
    // Username validation
    if (!username || username.length > 30) {
      alert("Username must be between 1 and 30 characters long.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email format regex
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }
    if (email.length > 50) {
      alert("Email should not exceed 50 characters.");
      return false;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters long.");
      return false;
    }
    if (password !== repeatPassword) {
      alert("Passwords do not match.");
      return false;
    }
    if (profilePic && profilePic.type !== "image/png") {
      alert("Profile picture must be a PNG image.");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    const sanitizedUsername = sanitizeInput(username);
    const sanitizedEmail = sanitizeInput(email);

    if (!validateInputs()) return;

    const formData = new FormData();
    formData.append("username", sanitizedUsername);
    formData.append("email", sanitizedEmail);
    formData.append("password", password);
    formData.append("profile_pic", profilePic);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        console.log("Signup successful!");
        const { token, user } = response.data;

        // Store the token and user details in localStorage
        localStorage.setItem("authToken", token);
        localStorage.setItem("isLoggedIn", JSON.stringify(true));
        localStorage.setItem("userId", user.user_id);
        localStorage.setItem("profilePic", user.profile_pic || "");

        // Update the context state
        backendStatus.setIsLoggedIn(true);
        backendStatus.setUserId(user.user_id);
        backendStatus.setAuthToken(token);
        backendStatus.setProfilePic(user.profile_pic);

        router.push(`/user/${user.user_id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Signup failed. Please check your inputs and try again.");
    }
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type !== "image/png") {
      alert("Only PNG images are allowed.");
      setProfilePic(null);
    } else {
      setProfilePic(file);
    }
  };

  return (
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground my-[5vw]">
      <h2 className="text-[3vw] mb-[1vw]">Create Your Profile</h2>
      <input
        type="text"
        placeholder="Username"
        className="input input-bordered w-full max-w-xs my-2 bg-accent"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="Repeat Password"
        className="input input-bordered w-full max-w-xs my-2 bg-accent"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <input
        type="file"
        className="file-input w-full max-w-xs my-2 bg-accent"
        onChange={handleProfilePicChange}
      />
      <button
        onClick={handleSignup}
        className="btn btn-foreground w-full max-w-xs my-2"
      >
        Signup
      </button>
      <Link href="/login" className="btn btn-foreground w-full max-w-xs">
        Log In
      </Link>
    </div>
  );
};

export default ProfileCreation;
