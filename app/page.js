"use client";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";

import { useRouter } from "next/navigation";

export default function Home() {
  if (localStorage.getItem("token") || localStorage.getItem("guestId")) {
    return (
      <main className="text-white font-custMontFont bg-slate-950 ">
        <Chat />
      </main>
    );
  }
  const router = useRouter();
  router.push("/auth");
  return <></>;
}
