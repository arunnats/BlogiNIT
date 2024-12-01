import React, { useState } from "react";
import Link from "next/link";

const UserDesc = (user_id) => {
  const [numPosts, setnumPosts] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [numComments, setNumComments] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const getPostDetails = async () => {
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
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground bg-background border-4 border-black w-[80vw]">
      <div className="w-full h-[6.5vw] flex flex-row">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar h-full mx-8"
        >
          <img
            className="rounded-full py-2 min-w-20 h-auto"
            alt="User Avatar"
            src="/defaultPfp.svg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="h-full flex items-center border-l-4  border-black px-4">
          <h3 className="text-[3vw] ">Username</h3>
        </div>
      </div>
    </div>
  );
};

export default UserDesc;
