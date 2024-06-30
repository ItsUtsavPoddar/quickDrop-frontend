"use client";
import Header from "@/components/Header";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MessageReceived from "./MessageReceived";
import MessageSent from "./MessageSent";
import { useEffect, useRef } from "react";
import axios from "axios";
import AddRoom from "./AddRoom";
import { set } from "react-hook-form";

export default function Chat() {
  const messagesEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (messagesEndRef) {
      messagesEndRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  useEffect(() => {
    getMessages();
  }, [selectedRoomId]);

  async function sendMessage(e) {
    e.preventDefault();

    console.log(content, selectedRoomId);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/messages/`,
        {
          content: content,
          roomId: selectedRoomId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setContent("");
        console.log("Message Sent");
        getMessages();
      }
    } catch (error) {
      setContent("");
      throw error;
    }
  }

  async function getMessages() {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/messages/${selectedRoomId}`,

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        console.log("Messages Received");
        setMessages(response.data);
      }
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <div className="flex bg-black flex-col h-dvh w-full">
        {/* <div className="flex-1 flex flex-col md:flex-row"> */}
        {/* BREAK */}
        <div className="flex-1 p-3">
          <Header onSelectRoom={setSelectedRoomId} />
          <div
            ref={messagesEndRef}
            className="flex h-[calc(100vh-160px)] flex-col justify-end rounded-md border-zinc-500"
          >
            <div className="flex-1 overflow-y-auto p-2 ">
              <div className="grid gap-4 flex-col">
                {messages.map((msg) =>
                  msg.username.toLowerCase() ===
                  localStorage.getItem("username").toLowerCase() ? (
                    <MessageSent key={msg.id} data={msg} />
                  ) : (
                    <MessageReceived key={msg.id} data={msg} />
                  )
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
