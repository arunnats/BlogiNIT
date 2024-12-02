import React, { useEffect, useState } from "react";
import Link from "next/link";
import CommentBox from "./CommentBox";
import CommentCreate from "./CommentCreate";
import axios from "axios";

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments for the post
    axios
      .get(`http://localhost:4000/post/${postId}/comments`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Comments fetched successfully:", response.data.comments);
          setComments(response.data.comments); // Assuming the API sends comments in `data.comments`
        }
      })
      .catch((err) => console.error("Error fetching comments:", err));
  }, [postId]);

  return (
    <div className="flex flex-col items-center gap-4">
      <CommentCreate />

      {comments.map((comment) => (
        <CommentBox
          key={comment.comment_id}
          comment={{
            post_id: postId,
            author_id: comment.user_id,
            content: comment.content,
            timestamp: comment.timestamp,
          }}
        />
      ))}
    </div>
  );
};

export default CommentSection;
