"use client";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { ScrollArea } from "./ui/scroll-area";
import { forwardRef, useImperativeHandle } from "react";
import { socket } from "../utils/socket";
const Rooms = ({ onSelectRoom, rooms }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className=" bg-[#000000] text-white" variant="">
          <MenuIcon className="h-8 w-8" />
          <span className="pl-2 text-xl">Rooms</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className=" bg-[#171717] text-white border-0 ">
        <div className="border-0 p-4 h-[calc(100vh-32px)] ">
          <div className="mb-4 flex items-center justify-between ">
            <h2 className="text-lg font-medium">Your Rooms</h2>
          </div>
          <div className="space-y-2 ">
            <ScrollArea className="h-72 rounded-md ">
              {rooms.map((room) => (
                <Link
                  key={room.id}
                  href="#"
                  className="flex items-center gap-3 rounded-md  px-3 py-2 hover:bg-muted/50"
                  prefetch={false}
                  onClick={() => {
                    console.log("FROM ROOMS", room.id);
                    onSelectRoom([room.id, room.name, room.type]);
                  }}
                >
                  <Avatar className="h-8 w-8 text-black">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>
                      {room.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium">{room.name}</p>
                    <p className="text-sm text-muted-foreground">{room.type}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{room.id}</div>
                </Link>
              ))}
            </ScrollArea>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Rooms;

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
