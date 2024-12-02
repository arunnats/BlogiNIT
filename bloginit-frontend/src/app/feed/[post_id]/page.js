"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar/Navbar";
import Down from "../../components/505/Down";
import PostBox from "../../components/postBox/PostBoxFull";
import CommentSection from "../../components/commentSection/CommentSection";
import axios from "axios";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use } from "react";

export default function Feed({ params }) {
  const [postDetails, setPostDetails] = useState([]);
  const resolvedParams = use(params);
  const postId = resolvedParams.post_id;
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login");
    } else {
      axios
        .get("http://localhost:4000/posts/details", {
          params: { postId },
          headers: { Authorization: `Bearer ${backendStatus.authToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setPostDetails(response.data);
          }
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [backendStatus, router, postId]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
        <main className="p-4 flex flex-col justify-center items-center gap-4">
          <PostBox
            post={{
              post_id: postDetails.post_id,
              author_id: postDetails.author_id,
              title: postDetails.title,
              content: postDetails.content,
              timestamp: postDetails.timestamp,
            }}
          />
          <CommentSection postId={postDetails.post_id} />
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
