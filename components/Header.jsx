"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Rooms from "./Rooms";
import AddRoom from "./AddRoom";
import { useState, useEffect } from "react";
import axios from "axios";

const Header = ({ onSelectRoom }) => {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);

  const addAnonymousRoom = (data) => {
    setRooms([...rooms, data]);
  };
  useEffect(() => {
    getRooms();
  }, []);

  async function getRooms() {
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/rooms`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          console.log("Rooms Received");
          console.log(response.data);
          setRooms(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("guestId");
    router.push("/auth");
  }

  return (
    <>
      <div className="font-cust  text-white  top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-3 bg-[#0a0a0a] bg-opacity-95 text-lg">
        <div className="text-xl  font-light">
          <Rooms onSelectRoom={onSelectRoom} rooms={rooms} />
        </div>
        <nav className="  gap-4 justify-center flex">
          <AddRoom getRooms={getRooms} addAnonymousRoom={addAnonymousRoom} />
          <Button className="hover:cursor-pointer" onClick={logout}>
            LogOut
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Header;
