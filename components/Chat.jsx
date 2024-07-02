"use client";

import Header from "@/components/Header";
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

export default function Chat() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loadingMessage]);

  socket.on("connect", () => {
    console.log(`Connected to server with id: ${socket.id}`);
  });

  socket.emit("joinRoom", selectedRoom[0]);

  socket.on("receiveMessage", (newMessage) => {
    console.log("revieved message");
    console.log(newMessage);
    setMessages([...messages, newMessage]);
    setLoadingMessage(false);
  });

  async function sendMessage(e) {
    e.preventDefault();
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
      console.log("AAAAAAAAAAAAAAAAAAA");
      messagesEndRef.current.scrollTo({
        top: messagesEndRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    console.log("Selected Room Id: ", selectedRoom[0]);
    getMessages();
  }, [selectedRoom]);

  async function getMessages() {
    setLoading(true);
    try {
      let response = {};
      if (selectedRoom[2] === "public") {
        //console.log(socket.id);
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
        <div className="flex-1 p-3 bg-black">
          <Header onSelectRoom={setSelectedRoom} />
          {!loading && selectedRoom[0] && (
            <div>
              <div className="flex flex-col justify-center items-center pb-2 text-3xl font-medium">
                {selectedRoom[1]}
              </div>
              <div className="mt-5 flex h-[calc(100vh-160px)] flex-col justify-end rounded-md border-t">
                <div
                  className="flex-1 overflow-y-auto p-2 "
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

                <div className="border-0 p-4 ">
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
          {!loading && !selectedRoom[0] && (
            <>
              <div className="flex flex-col justify-center items-center pt-32 text-3xl font-medium ">
                Select Room to Display
              </div>
            </>
          )}
          {loading && selectedRoom[0] && <LoaderChat />}
        </div>
      </div>
    </>
  );
}

function CircleUserIcon(props) {
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
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="10" r="3" />
      <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662" />
    </svg>
  );
}

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

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UserPlusIcon(props) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}
