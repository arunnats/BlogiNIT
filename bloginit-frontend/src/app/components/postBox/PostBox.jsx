import React, { useState } from "react";
import Link from "next/link";

const PostBox = (post_id) => {
  const [author_id, setAuthor_id] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [numComments, setNumComments] = useState("");

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
        <div className="h-full flex items-center border-x-4  border-black px-4">
          <h3 className="text-[2vw] ">Username</h3>
        </div>
        <div className="h-full flex items-center">
          <h3 className="text-[2vw] ml-4">Title</h3>
        </div>
      </div>
      <div className="text-[1.5vw] w-full max-h-[15.3vw] border-y-4 border-black overflow-hidden text-ellipsis line-clamp-6 p-4 text-justify">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis tenetur
        laboriosam, minus eos libero atque maiores repudiandae exercitationem
        voluptas laudantium sunt. Itaque tempora accusantium reprehenderit
        voluptatum quasi provident optio vel. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Quis tenetur laboriosam, minus eos libero
        atque maiores repudiandae exercitationem voluptas laudantium sunt.
        Itaque tempora accusantium reprehenderit voluptatum quasi provident
        optio vel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
        tenetur laboriosam, minus eos libero atque maiores repudiandae
        exercitationem voluptas laudantium sunt. Itaque tempora accusantium
        reprehenderit voluptatum quasi provident optio vel. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Quis tenetur laboriosam, minus
        eos libero atque maiores repudiandae exercitationem voluptas laudantium
        sunt. Itaque tempora accusantium reprehenderit voluptatum quasi
        provident optio vel.
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
