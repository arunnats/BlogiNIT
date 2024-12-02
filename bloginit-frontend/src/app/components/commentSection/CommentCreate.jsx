import React, { useState } from "react";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import axios from "axios";

const CommentCreate = ({ postId }) => {
  const [content, setContent] = useState("");
  const backendStatus = useBackendStatus();
  const authorId = backendStatus.userId;

  // console.log(postId);

  const createComment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/post/${postId}/comments`,
        {
          content,
          userId: authorId,
        }
      );

      if (response.status === 201) {
        // console.log("Comment created successfully:", response.data.newComment);
        setContent("");
        window.location.reload(); // Reload the entire page
      } else {
        // console.log("Unexpected response:", response);
      }
    } catch (err) {
      console.error("Error creating comment:", err);
    }
  };

  return (
    <div className="flex flex-col items-center font-poppins text-foreground bg-background border-4 border-black w-[80vw]">
      <div className="w-full h-[4.5vw] flex flex-row">
        <div className="h-full flex items-center px-4">
          <h3 className="text-[2vw] ">Leave a comment</h3>
        </div>
        <div className="h-full flex items-center border-l-4 border-black px-4">
          <h3 className="text-[2vw] ">Be kind :)</h3>
        </div>
      </div>
      <textarea
        className="w-full h-32 p-4 bg-background border-y-4 border-black resize-none focus:outline-none"
        placeholder="Share your thoughts..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="w-full h-[4vw] flex flex-row justify-end ">
        <div className="border-l-4  border-black px-4 align-middle items-center ">
          {" "}
          <button
            onClick={createComment}
            className="translate-y-1 btn bg-accent border-0 px-4 text-foreground font-poppinsbold text-lg hover:bg-foreground hover:text-background"
          >
            Create Comment!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentCreate;
