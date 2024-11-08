import Navbar from "../components/navbar/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="p-4 flex flex-row mt-28"></main>
    </div>
  );
}
