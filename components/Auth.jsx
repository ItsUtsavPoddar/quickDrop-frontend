"use client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function Auth() {
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [guestId, setGuestId] = useState("LMAO");
  const [loading, setLoading] = useState(false);
  const [loadingGuest, setLoadingGuest] = useState(false);

  const router = useRouter();

  async function login(e) {
    e.preventDefault();
    // Handle form for login to .env api using axios
    setLoading(true);

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
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("username", username);
        setUsername("");
        setPassword("");
        toast({
          title: "Successfully Logged in! Welcome back",
          description: "Redirecting to dashboard...",
        });
        router.push("/"); // Redirect to dashboard
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: `${error.response.data.message}`,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function register(e) {
    e.preventDefault();

    setLoading(true);

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
        toast({
          title: "Successfully Registered!",
          description: "Logging in...",
        });
        login(e);
      }
      if (response.status === 400) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "User already exists",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Check your internet or Server Error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  async function guest(e) {
    e.preventDefault();
    setLoadingGuest(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/users/guest`,
        { guestName: guestId }
      );

      console.log("data is received from the backend");
      console.log(response.data);
      if (response.data.guestId) {
        localStorage.setItem("guestId", response.data.guestId);
        toast({
          title: `Successfully Logged in as ${response.data.guestId}!`,
          description: "Redirecting to dashboard...",
        });
        router.push("/"); // Redirect to dashboard
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Check your internet or Server Error",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("token") && localStorage.getItem("guestId")) {
      localStorage.clear();
    } else if (
      localStorage.getItem("token") ||
      localStorage.getItem("guestId")
    ) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <div className="flex min-h-screen items-start justify-center bg-[#2e151b00] text-black px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h1 className=" pb-6 text-center text-white  text-5xl font-bold tracking-tight text-background">
            {"ChatN Gone"}
          </h1>
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
            <TabsList className="mb-6 grid w-full grid-cols-2 rounded-lg bg-[#0000005c] text-white p-1">
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
                <Button
                  type="submit"
                  className="w-full bg-[#7878786e]"
                  onClick={login}
                >
                  {loading ? <Loader /> : "Sign in"}
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
                <Button
                  type="submit"
                  className="w-full bg-[#7878786e]"
                  onClick={register}
                >
                  {loading ? <Loader /> : "Sign up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="justify-center w-full pt-4">
            <form className="space-y-4">
              <Input
                id="guestId"
                type="guestId"
                autoComplete="off"
                required
                className="mt-1 block w-full"
                placeholder="Anonymous Name"
                onChange={(e) => setGuestId(e.target.value)}
              />
              <Button
                type="submit"
                className="w-full bg-[#7878786e]"
                onClick={guest}
              >
                {loadingGuest ? <Loader /> : "Be Anonymous"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
