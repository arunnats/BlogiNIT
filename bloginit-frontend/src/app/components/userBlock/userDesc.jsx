import React, { useState } from "react";
import Link from "next/link";

const UserDesc = (userDetails) => {
  return (
    <div className="flex flex-col items-center font-poppins text-[4vw] text-foreground bg-background border-4 border-black w-[80vw]">
      <div className="w-full h-[6.5vw] flex flex-row justify-between">
        <div className="flex flex-row">
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
          <div className="h-full flex items-center border-x-4  border-black px-4">
            <h3 className="text-[3vw] ">{userDetails.userDetails.username}</h3>
          </div>
        </div>

        <div className="h-full flex items-center border-l-4  border-black px-4">
          <h3 className="text-[3vw] ">
            {userDetails.userDetails.post_count ? (
              <>
                <span>{userDetails.userDetails.post_count}</span>
                <span> posts</span>
              </>
            ) : (
              <>0 posts</>
            )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default UserDesc;
