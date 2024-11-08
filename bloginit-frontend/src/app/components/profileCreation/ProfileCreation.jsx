import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const ProfileCreation = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSignup = async () => {
    // Password matching validation
    if (password !== repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profile_pic", profilePic);

    try {
      const response = await axios.post(
        "https://your-backend-url.com/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        setSuccess("Signup successful!");
        setError(""); // Clear any previous errors
      }
    } catch (err) {
      setError("Signup failed. Please check your information.");
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
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default ProfileCreation;
