import Auth from "@/components/Auth";
import { Toaster } from "@/components/ui/toaster";
export default function Home() {
  return (
    <main className="">
      <Auth />
      <Toaster />
    </main>
  );
}
