import Navbar from "./components/navbar/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="p-4 flex flex-row mt-16">
        <div className="w-[60%] flex flex-col justify-center items-center">
          {" "}
          <h3 className="font-aloevera text-[13vw] text-accent">BlogiNIT</h3>
          <p className="font-poppins text-[3vw] text-foreground -translate-y-8">
            Your thoughts. Unfiltered.
          </p>
          <div className="flex flex-row gap-4">
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppins"
              href="/profile"
            >
              Visit the feed!
            </Link>
            <Link
              className="btn bg-accent border-0 px-20 text-foreground font-poppins"
              href="/profile"
            >
              Make a post!
            </Link>
          </div>
        </div>
        <div className="w-[40%] flex">
          <p className="font-poppins text-[2vw] text-foreground">
            Lorem ipsum Lorem ipsumLorem ipsumLorem ipsum Lorem ipsum Lorem
            ipsum
          </p>
        </div>
      </main>
    </div>
  );
}
