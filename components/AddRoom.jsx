"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import axios from "axios";

const AddRoom = ({ callGetRoomFunction }) => {
  const [activeTab, setActiveTab] = useState("create");
  const [open, setOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomId, setRoomId] = useState("");

  async function joinRoom(rid) {
    if (!rid) {
      rid = roomId;
      setRoomId("");
    }
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/rooms/join/${rid}`,
          {},
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          console.log("Room Joined");
          console.log(response.data);
          setOpen(false);
          callGetRoomFunction();

          //   getRooms();
        }
      } catch (error) {
        throw error;
      }
    }
  }

  async function createRoom(e) {
    e.preventDefault();
    if (localStorage.getItem("token")) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/rooms`,
          {
            name: roomName,
            type: "public",
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        if (response.status === 200) {
          console.log("Room Created");
          console.log(response.data.id);
          console.log(response.data);
          setRoomName("");
          joinRoom(response.data.id);
        }
      } catch (error) {
        setRoomName("");
        throw error;
      }
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/rooms/anonymous`,
          {
            name: roomName,
            type: "anonymous",
          }
        );

        if (response.status === 200) {
          console.log("Room Added");

          console.log(response.data);
        }
      } catch (error) {
        throw error;
      }
    }
  }

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className=" bg-[#18181b] h-9 rounded-md px-3 text-white underline-offset-4 text-sm font-medium  hover:underline">
          Create or Join Room
        </DialogTrigger>
        <DialogContent className="max-h-[80vh]  bg-[#000336] border-0 text-white overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700">
          <DialogTitle></DialogTitle>
          <Card className="max-w-md mx-auto ">
            <CardHeader>
              <CardTitle>Create or Join a Chat Room</CardTitle>
              <CardDescription>
                Choose to create a new chat room or join an existing one.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Tabs
                  defaultValue="join"
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="border-b"
                >
                  <TabsList>
                    <TabsTrigger value="join">Join Room</TabsTrigger>
                    <TabsTrigger value="create">Create Room</TabsTrigger>
                  </TabsList>

                  <TabsContent value="join" className="pt-4">
                    <form className="space-y-4">
                      <div>
                        <Input
                          id="invite-code"
                          placeholder="Enter Room Code"
                          value={roomId}
                          onChange={(e) => setRoomId(e.target.value)}
                        />
                      </div>

                      <Button
                        type="button"
                        className="w-full"
                        onClick={(e) => {
                          e.preventDefault();
                          joinRoom();
                        }}
                      >
                        Join Chat Room
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="create" className="pt-4">
                    <form className="space-y-4">
                      <div>
                        <Input
                          id="name"
                          placeholder="Chat Room Name"
                          value={roomName}
                          onChange={(e) => setRoomName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Room Type</Label>
                        <RadioGroup
                          defaultValue="public"
                          className="flex items-center gap-4"
                        >
                          <Label
                            htmlFor="public"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <RadioGroupItem id="public" value="public" />
                            Public
                          </Label>
                          <Label
                            htmlFor="private"
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <RadioGroupItem id="private" value="private" />
                            Private
                          </Label>
                        </RadioGroup>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full"
                        onClick={createRoom}
                      >
                        Create Chat Room
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddRoom;
