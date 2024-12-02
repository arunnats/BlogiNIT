"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/components/navbar/Navbar";
import Down from "@/app/components/505/Down";
import PostBox from "@/app/components/postBox/PostBoxUserPage";
import UserDesc from "@/app/components/userBlock/userDesc";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use } from "react";
import Link from "next/link";
import axios from "axios";

export default function Feed({ params }) {
  const resolvedParams = use(params);
  const userid = resolvedParams.user_id;
  const [posts, setPosts] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const backendStatus = useBackendStatus();
  const router = useRouter();

  useEffect(() => {
    if (!backendStatus.isLoggedIn) {
      router.push("/login"); // Redirect to the login page
    } else {
      // Fetch posts
      axios
        .get(`http://localhost:4000/posts/user/${userid}`, {
          headers: { Authorization: `Bearer ${backendStatus.authToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            setPosts(response.data.posts);
          }
        })
        .catch((err) => console.error("Error fetching posts:", err));

      axios
        .get(`http://localhost:4000/users/user-details/${userid}`, {
          headers: { Authorization: `Bearer ${backendStatus.authToken}` },
        })
        .then((response) => {
          if (response.status === 200) {
            // console.log("User Details:", response.data.user);

            setUserDetails(response.data.user);
          }
        })
        .catch((err) => console.error("Error fetching user details:", err));
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
          <UserDesc userDetails={userDetails} />
          <div className="flex flex-row gap-4">
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppinsbold text-lg 
               hover:bg-foreground hover:text-background"
              href="/feed"
            >
              Visit the feed!
            </Link>
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppinsbold text-lg 
hover:bg-foreground hover:text-background"
              href="/create"
            >
              Make a post!
            </Link>
          </div>
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
