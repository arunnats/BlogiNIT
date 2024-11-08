import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

const PostCreation = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [contentPic, setContentPic] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleContentPicChange = (e) => {
    setContentPic(e.target.files[0]);
  };

  const handlePostCreation = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("contentPic", contentPic);

    try {
      const response = await axios.post(
        "https://your-backend-url.com/endpoint",
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
      <h2 className="text-[3vw] mb-[1vw]">Create A Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full max-w-xs my-2 bg-accent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        type="content"
        placeholder="Type your post here!"
        className="textarea textarea-bordered w-full max-w-xs my-2 bg-accent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePostCreation}
        className="btn btn-foreground w-full max-w-xs my-2"
      >
        Post!
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">{success}</p>}
    </div>
  );
};

export default PostCreation;
