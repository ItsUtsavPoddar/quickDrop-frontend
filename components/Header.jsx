import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Rooms from "./Rooms";
import AddRoom from "./AddRoom";

const Header = () => {
  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    router.push("/auth");
  }
  return (
    <>
      <div className="font-cust  text-white  top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0a0a0a] bg-opacity-95 text-lg">
        <div className="text-xl  font-light">
          <Rooms />
        </div>
        <nav className="  gap-4 justify-center flex">
          <AddRoom />
          <Button className="hover:cursor-pointer" onClick={logout}>
            LogOut
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
