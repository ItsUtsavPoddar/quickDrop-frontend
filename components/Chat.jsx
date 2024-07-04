"use client";

import Header from "@/components/Header";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import { useEffect, useRef } from "react";
import axios from "axios";
import { socket } from "../utils/socket";
import LoaderChat from "./LoaderChat";
import { LoaderChatSmall } from "./LoaderChat";
import Landing from "./Landing";
import { BackgroundBeamsComponent } from "./BackgroundBeamsComponent";
import Footer from "./Footer";

import { CanvasRevealEffectDemo } from "./CanvasRevealEffectDemo";

export default function Chat() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);
  const { toast } = useToast();

  socket.on("connect", () => {
    console.log(`Connected to server with id: ${socket.id}`);
  });

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingMessage]);

  useEffect(() => {
    if (selectedRoom) {
      console.log("Selected Room Id: ", selectedRoom[0]);
      socket.emit("joinRoom", selectedRoom?.[0]);
      setMessages([]);
      getMessages();
    }
  }, [selectedRoom]);

  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      console.log(
        "Received message",
        newMessage,
        newMessage.roomId,
        selectedRoom ? selectedRoom[0] : "No room selected"
      );

      if (selectedRoom && newMessage.roomId === selectedRoom[0]) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
      setLoadingMessage(false);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [selectedRoom]);

  async function sendMessage(e) {
    e.preventDefault();
    if (!content || content.trim() === "") {
      toast({
        variant: "destructive",
        title: "Message cannot be empty",
        description: "Please type a message to send",
      });
      return;
    }

    setLoadingMessage(true);

    console.log(content, selectedRoom[0]);
    // try {
    //   const response = await axios.post(
    //     `${process.env.NEXT_PUBLIC_BACKEND_API}/messages/`,
    //     {
    //       content: content,
    //       roomId: selectedRoomId,
    //     },
    //     {
    //       headers: {
    //         Authorization: "Bearer " + localStorage.getItem("token"),
    //       },
    //     }
    //   );

    //   if (response.status === 200) {
    //     setContent("");
    //     console.log("Message Sent");
    //     getMessages();
    //   }
    // } catch (error) {
    //   setContent("");
    //   throw error;
    // }
    if (localStorage.getItem("token")) {
      socket.emit("sendMessage", {
        roomId: selectedRoom[0],
        userId: localStorage.getItem("userId"),
        content: content,
      });

      setContent("");
    } else {
      socket.emit("sendAnonymousMessage", {
        roomId: selectedRoom[0],
        guestName: localStorage.getItem("guestId"),
        content: content,
      });

      setContent("");
    }
  }

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  async function getMessages() {
    setLoading(true);
    try {
      let response = {};
      if (selectedRoom[2] === "public") {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/messages/${selectedRoom[0]}`,

          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
      } else {
        response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_API}/messages/anonymous/${selectedRoom[0]}`
        );
      }

      if (response.status === 200) {
        console.log("Messages Received", selectedRoom);
        console.log(response.data);
        setMessages(response.data);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description:
          "Can't Get Messages, Check your Network Or Try Again Later (Server Error)",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex bg-black flex-col h-dvh w-full">
        {/* <div className="flex-1 flex flex-col md:flex-row"> */}
        {/* BREAK */}

        <div className=" flex-1 p-3 ">
          <Header onSelectRoom={setSelectedRoom} />

          {!loading && selectedRoom && (
            <div>
              <div className="flex  justify-center items-center py-2 text-2xl font-medium  gap-4 overflow-scroll  ">
                <div>{selectedRoom[1]}</div>
                <div className="text-lg "> ( {selectedRoom[0]} )</div>
              </div>

              <div className="mt-5 relative z-10 flex h-[calc(100vh-190px)] flex-col justify-end rounded-md border-2 border-gray-900 ">
                <div className="absolute inset-0 z-0">
                  <CanvasRevealEffectDemo />
                </div>
                <div
                  className=" flex-1 overflow-y-auto p-2 "
                  ref={messagesEndRef}
                >
                  <div className="flex gap-4 flex-col">
                    {messages.map((msg) => {
                      const storedUsername = localStorage.getItem("username");
                      const storedGuestId = localStorage.getItem("guestId");

                      const isCurrentUser =
                        (storedUsername &&
                          msg.username &&
                          msg.username.toLowerCase() ===
                            storedUsername.toLowerCase()) ||
                        (storedGuestId &&
                          msg.guestName &&
                          msg.guestName.toLowerCase() ===
                            storedGuestId.toLowerCase());

                      return isCurrentUser ? (
                        <MessageSent key={msg.id} data={msg} />
                      ) : (
                        <MessageReceived key={msg.id} data={msg} />
                      );
                    })}
                    {loadingMessage && (
                      <LoaderChatSmall className="pt-0 grid" />
                    )}
                  </div>
                </div>

                <div className="border-0 p-4 relative z-20 ">
                  <form className="flex items-center gap-2">
                    <Input
                      id="message"
                      placeholder="Type your message..."
                      className="flex-1 text-black"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                    <Button type="submit" onClick={sendMessage}>
                      <SendIcon className="h-5 w-5" />
                      <span className="">Send message</span>
                    </Button>
                  </form>
                </div>
              </div>
              {/* </div> */}
            </div>
          )}
          {!loading && !selectedRoom && (
            <>
              {/* <div className="flex flex-col justify-center items-center pt-32 text-3xl font-medium ">
                Select Room to Display
              </div> */}
              {/* <BackgroundBeamsComponent /> */}
              <Landing />
            </>
          )}
          {loading && selectedRoom && <LoaderChat />}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
}

function SendIcon(props) {
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
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}
