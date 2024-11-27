import React, { useState } from "react";
import Link from "next/link";

const CommentCreate = (post_id) => {
  const [content, setContent] = useState("");

  const createComment = async () => {
    try {
      const response = await axios.post(
        "https://your-backend-url.com/postIDKAFAGFW",
        {
          comment_id,
        }
      );

      if (response.status === 200) {
      }
    } catch (err) {
      console.log(err);
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
