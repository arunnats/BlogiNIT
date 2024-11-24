"use client";

import Navbar from "../../components/navbar/Navbar";
import Down from "../../components/505/Down";
import Link from "next/link";
import { useBackendStatus } from "@/app/context/BackendStatusContext";
import { use, useEffect, useState } from "react";

export default function Feed({ params }) {
  // Step 1: Handle params as a promise
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Awaiting params as it’s now a Promise
    async function fetchParams() {
      const resolvedParams = await params;
      setUserId(resolvedParams.user_id);
    }
    fetchParams();
  }, [params]);

  const isBackendUp = useBackendStatus();

  console.log("User ID:", userId);
  console.log("Backend Status:", isBackendUp);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {isBackendUp ? (
        <main className="p-4 flex flex-row justify-center">
          <div>User ID: {userId}</div>
        </main>
      ) : (
        <div>
          <Down />
        </div>
      )}
    </div>
  );
}
