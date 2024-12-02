import React, { useEffect, useState } from "react";

const PostBox = ({ post }) => {
  const { post_id, author_id, title, content, timestamp } = post;
  const [profilePic, setProfilePic] = useState("/noPfp.webp");
  const [userData, setUserData] = useState("");
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/profile-pic/${author_id}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);

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

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/users/user-details/${author_id}`
        );
        if (response.ok) {
          const data = await response.json();

          console.log(data.user.username);

          if (data) {
            setUserData(data.user.username);
          }
        }
      } catch (error) {
        console.error("Failed to fetch details:", error);
      }
    };

    fetchAuthorDetails();
  }, [author_id]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/posts/${post_id}/comments/count`
        );
        if (response.ok) {
          const data = await response.json();
          setCommentCount(data.commentCount);
        }
      } catch (error) {
        setProfilePic(`/noPfp.webp`);
        console.error("Failed to fetch profile picture:", error);
      }
    };

    fetchCommentCount();
  }, [post_id]);

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
            src={profilePic}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="h-full flex items-center border-x-4  border-black px-4">
          <h3 className="text-[2vw] ">{userData}</h3>
        </div>
        <div className="h-full flex items-center">
          <h3 className="text-[2vw] ml-4">{title}</h3>
        </div>
      </div>
      <div className="text-[1.5vw] w-full border-y-4 border-black overflow-hidden text-ellipsis p-4 text-justify">
        {content}
      </div>

      <div className="w-full h-[4vw] flex flex-row justify-between">
        <div className="h-full flex items-center border-r-4 border-black px-4">
          <h3 className="text-[2vw] "> Comments: {commentCount}</h3>
        </div>
        <div className="h-full flex items-center border-l-4 border-black px-4">
          <h3 className="text-[2vw]">{new Date(timestamp).toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
};

export default PostBox;
