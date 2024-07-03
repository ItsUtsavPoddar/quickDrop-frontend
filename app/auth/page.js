import { Aurora } from "@/components/Aurora";
import Auth from "@/components/Auth";
import { Toaster } from "@/components/ui/toaster";
export default function Home() {
  return (
    <main>
      {/* <Auth /> */}
      <Aurora />
      <Toaster />
    </main>
  );
}
