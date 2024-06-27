import Footer from "@/components/Footer";
import Auth from "@/components/Auth";
import Chat from "@/components/Chat";
import Rooms from "@/components/Rooms";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <h1 className="font-custMontFont bg-slate-950 text-white ">ChatN'Gone</h1> */}
      {/* <Auth /> */}
      <Chat />
      {/* <Rooms /> */}
      {/* <Footer /> */}
    </main>
  );
}
