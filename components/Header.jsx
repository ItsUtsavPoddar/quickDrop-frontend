"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Rooms from "./Rooms";
import AddRoom from "./AddRoom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "./Navbar";

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
      <Navbar>
        <Rooms onSelectRoom={onSelectRoom} rooms={rooms} />

        <AddRoom getRooms={getRooms} addAnonymousRoom={addAnonymousRoom} />
        <Button
          className=" bg-[#00000000] text-md hover:bg-[#00000000]"
          onClick={logout}
        >
          LogOut
        </Button>
      </Navbar>
    </>
  );
};

export default Header;
