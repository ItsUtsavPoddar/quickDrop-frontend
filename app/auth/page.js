import AuroraBackgroundDemo from "@/components/AuroraBackgroundDemo";
import Auth from "@/components/Auth";
import { Toaster } from "@/components/ui/toaster";
export default function Home() {
  return (
    <main className="text-white font-custMontFont">
      {/* <Auth /> */}
      <AuroraBackgroundDemo />
      <Toaster />
    </main>
  );
}
