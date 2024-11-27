import React, { useState } from "react";
import Link from "next/link";
import CommentBox from "./CommentBox";
import CommentCreate from "./CommentCreate";

const CommentSection = (post_id) => {
  const getCommentSection = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-url.com/postIDKAFAGFW",
        {
          post_id,
        }
      );

      if (response.status === 200) {
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <CommentCreate />
      <CommentBox />
      <CommentBox />
    </div>
  );
};

export default CommentSection;
