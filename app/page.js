"use client";
import Footer from "@/components/Footer";
import Chat from "@/components/Chat";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

import { useRouter } from "next/navigation";

export default function Home() {
  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (
      (localStorage.getItem("token") && localStorage.getItem("guestId")) ||
      (!localStorage.getItem("token") && !localStorage.getItem("guestId"))
    ) {
      localStorage.clear();
      router.push("/auth");
      // setIsAuthenticated(true);
    }
  }, []);

  // if (!isAuthenticated) {
  //   return null; // Or you can return a loading spinner or a placeholder
  // }
  return (
    <main className="text-white font-custMontFont bg-black ">
      <Chat />
      <Toaster />
      {/* <Footer /> */}
    </main>
  );
}
