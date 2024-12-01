import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

const PostCreation = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const backendStatus = useBackendStatus();
  const authorId = backendStatus.userId;
  const router = useRouter();

  const handlePostCreation = async () => {
    console.log(backendStatus.authToken);
    if (!backendStatus.authToken) {
      alert("You need to log in to create a post.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/profile/create-post",
        { title, content, authorId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${backendStatus.authToken}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Created post successfully!", response.data);
        router.push(`/feed/${response.data.post.post_id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to create post. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col items-center font-poppins text-[4vw] w-[70vw] text-foreground my-[5vw]">
      <h2 className="text-[3vw] mb-[1vw]">Create A Post</h2>
      <input
        type="text"
        placeholder="Title"
        className="input input-bordered w-full  my-2 bg-accent"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Type your post here!"
        className="textarea textarea-bordered w-full h-64 my-2 bg-accent"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handlePostCreation}
        className="btn btn-foreground w-full max-w-xs my-2"
      >
        Post!
      </button>
    </div>
  );
};

export default PostCreation;
