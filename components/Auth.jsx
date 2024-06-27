"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import api from "../utils/api";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [guestId, setGuestId] = useState("lol");
  async function login(e) {
    e.preventDefault();
    // Handle form for login to .env api using axios

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/login`,
        {
          username,
          password,
        }
      );

      if (response.data.token) {
        console.log("Token is received from the backend"); // Token is received from the backend
        localStorage.setItem("token", response.data.token);
        //router.push("/"); // Redirect to dashboard or any other page
      }
    } catch (error) {
      throw error;
    }
  }

  async function register(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/register`,
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        console.log(e);
        login(e);
        //router.push("/"); // Redirect to dashboard or any other page
      }
      if (response.status === 400) {
        console.log("User already exists");
      }
    } catch (error) {
      throw error;
    }
  }

  async function guest() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/guest`,
        { guestName: guestId }
      );

      console.log("data is received from the backend"); // Token is received from the backend
      console.log(response.data);
      if (response.data.guestId) {
        localStorage.setItem("guestId", response.data.guestId);
        //router.push("/"); // Redirect to dashboard or any other page
      }
    } catch (error) {
      throw error;
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-800 text-black px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-background">
            {activeTab === "login"
              ? "Sign in Or Be Anonymous"
              : "Sign up Or Be Anonymous"}
          </h2>
        </div>
        <Tabs
          defaultValue={activeTab}
          className="w-full"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="mb-6 grid w-full grid-cols-2 rounded-lg bg-muted p-1">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login" className="space-y-6">
            <form className="space-y-4">
              <div>
                <Input
                  id="username"
                  type="username"
                  autoComplete="off"
                  required
                  className="mt-1 block w-full"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="mt-1 block w-full"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" onClick={login}>
                Sign in
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup" className="space-y-6">
            <form className="space-y-4">
              <div>
                <Input
                  id="username"
                  type="username"
                  autoComplete="off"
                  required
                  className="mt-1 block w-full"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="off"
                  required
                  className="mt-1 block w-full"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" onClick={register}>
                Sign up
              </Button>
            </form>
          </TabsContent>
        </Tabs>
        <div className="flex justify-center">
          <Button type="submit" className="w-full" onClick={guest}>
            Be Anonymous
          </Button>
        </div>
      </div>
    </div>
  );
}
