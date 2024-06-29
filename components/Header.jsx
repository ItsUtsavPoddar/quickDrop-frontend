"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Rooms from "./Rooms";
import AddRoom from "./AddRoom";
import { useRef } from "react";

const Header = () => {
  const roomsRef = useRef();

  const callGetRoomFunction = () => {
    if (roomsRef.current) {
      roomsRef.current.someFunction();
    }
  };

  const router = useRouter();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("guestId");
    router.push("/auth");
  }
  return (
    <>
      <div className="font-cust  text-white  top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0a0a0a] bg-opacity-95 text-lg">
        <div className="text-xl  font-light">
          <Rooms ref={roomsRef} />
        </div>
        <nav className="  gap-4 justify-center flex">
          <AddRoom callGetRoomFunction={callGetRoomFunction} />
          <Button className="hover:cursor-pointer" onClick={logout}>
            LogOut
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
