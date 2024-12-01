"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/navbar/Navbar";
import Down from "../components/505/Down";
import PostBox from "../components/postBox/PostBox";
import axios from "axios";
import { useBackendStatus } from "@/app/context/BackendStatusContext";

export default function Signup() {
  const [posts, setPosts] = useState([]);
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login"); // Redirect to the login page
    } else {
      // Fetch posts
      console.log("Token:", backendStatus.authToken);

      axios
        .get("http://localhost:4000/posts", {
          headers: { Authorization: `Bearer ${backendStatus.authToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setPosts(response.data.posts);
          }
        })
        .catch((err) => console.error("Error fetching posts:", err));
    }
  }, [backendStatus, router]);

  if (backendStatus.isBackendUp === null) {
    return <Down />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {backendStatus.isBackendUp && backendStatus.isLoggedIn ? (
        <main className="p-4 flex flex-col justify-center items-center gap-4">
          {posts.map((post) => (
            <PostBox
              key={post.post_id}
              post={{
                post_id: post.post_id,
                author_id: post.author_id,
                title: post.title,
                content: post.content,
                timestamp: post.timestamp,
                username: post.username,
              }}
            />
          ))}
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
