import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const CommentBox = ({ comment }) => {
  const author_id = comment.author_id;
  const content = comment.content;
  const post_id = comment.post_id;
  const [profilePic, setProfilePic] = useState("/noPfp.webp");
  const timestamp = comment.timestamp;
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/user-details/${author_id}`, {})
      .then((response) => {
        if (response.status === 200) {
          setUserDetails(response.data.user);
        }
      })
      .catch((err) => console.error("Error fetching user details:", err));
  }, [author_id]);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/profile-pic/${author_id}`
        );
        if (response.ok) {
          const data = await response.json();

          if (data.profilePic) {
            setProfilePic(`data:image/png;base64,${data.profilePic}`);
          }
        }
      } catch (error) {
        setProfilePic(`/noPfp.webp`);
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchProfilePic();
  }, [author_id]);

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
            src={profilePic}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="h-full flex items-center border-x-4  border-black px-4">
          <h3 className="text-[1.6vw] ">{userDetails.username}</h3>
        </div>
      </div>
      <div className="text-[1.5vw] w-full border-y-4 border-black overflow-hidden text-ellipsis p-4 text-justify">
        {content}
      </div>

      <div className="w-full h-[2.5vw] flex flex-row justify-end">
        <div className="h-full flex items-center border-l-4 border-black px-4">
          <h3 className="text-[1.4vw]">
            {new Date(timestamp).toLocaleString()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
