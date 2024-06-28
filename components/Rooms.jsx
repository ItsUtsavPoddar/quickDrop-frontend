"use client";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { useState, useMemo, useEffect } from "react";

export default function Rooms() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const filteredRooms = useMemo(() => {
    return [
      {
        id: "general",
        name: "General",
        description: "Chat about anything",
        members: 12,
      },
      {
        id: "design",
        name: "Design",
        description: "Discuss design topics",
        members: 8,
      },
      {
        id: "development",
        name: "Development",
        description: "Discuss development topics",
        members: 15,
      },
    ].filter((room) =>
      room.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="bg-muted border-r p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium">Your Rooms</h2>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-40 rounded-md bg-background px-3 text-sm"
          />
          <Button variant="ghost" size="icon">
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Create new room</span>
          </Button>
        </div>
      </div>
      <div className="space-y-2">
        {filteredRooms.map((room) => (
          <Link
            key={room.id}
            href="#"
            className="flex items-center gap-3 rounded-md bg-background px-3 py-2 hover:bg-muted/50"
            prefetch={false}
          >
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>{room.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium">{room.name}</p>
              <p className="text-sm text-muted-foreground">
                {room.description}
              </p>
            </div>
            <div className="text-sm text-muted-foreground">{room.members}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
