import React, { useState } from "react";
import Link from "next/link";

const PostBox = ({ post }) => {
  const { post_id, author_id, title, content, timestamp, username } = post;

  return (
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground bg-background border-4 border-black w-[80vw]">
      <div className="w-full h-[4.5vw] flex flex-row">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar  h-full mx-4"
        >
          <img
            className="rounded-full py-1"
            alt="User Avatar"
            src="/defaultPfp.svg"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="h-full flex items-center border-l-4  border-black px-4">
          <h3 className="text-[2vw] "> {title}</h3>
        </div>
      </div>
      <div className="text-[1.5vw] w-full max-h-[15.3vw] border-y-4 border-black overflow-hidden text-ellipsis line-clamp-6 p-4 text-justify">
        {content}
      </div>

      <div className="w-full h-[4vw] flex flex-row justify-between">
        <div className="h-full flex items-center border-r-4 border-black px-4">
          <h3 className="text-[2vw] ">Comments : 1</h3>
        </div>
        <div className="h-full flex items-center border-l-4 border-black px-4">
          <h3 className="text-[2vw]">09-11-24</h3>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
