import React, { useState } from "react";
import Link from "next/link";

const CommentBox = (comment_id) => {
  const [author_id, setAuthor_id] = useState("");
  const [content, setContent] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const getCommentDetails = async () => {
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
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground bg-background border-4 border-black w-[80vw]">
      <div className="w-full h-[3.5vw] flex flex-row">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar h-full mx-4"
        >
          <img
            className="rounded-full py-1"
            alt="User Avatar"
            src="/defaultPfp.svg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="h-full flex items-center border-x-4  border-black px-4">
          <h3 className="text-[1.6vw] ">Username</h3>
        </div>
      </div>
      <div className="text-[1.5vw] w-full border-y-4 border-black overflow-hidden text-ellipsis p-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tenetur
        laboriosam, minus eos libero atque maiores repudiandae exercitationem
        voluptas laudantium sunt. Itaque tempora accusantium reprehenderit
        voluptatum quasi provident optio vel. Lorem ipsum dolor sit amet
        consectetur adipisicing elit.
      </div>

      <div className="w-full h-[2.5vw] flex flex-row justify-end">
        <div className="h-full flex items-center border-l-4 border-black px-4">
          <h3 className="text-[1.4vw]">09-11-24</h3>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
