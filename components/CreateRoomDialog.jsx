"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("YOUR_API_URL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        setName("");
        setDescription("");
      } else {
        console.error("Error adding item:", response.status);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Item</CardTitle>
        <CardDescription>
          Fill out the form below to add a new item to the list.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Item description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="min-h-[100px]"
            />
          </div>
          <Button type="submit">Add Item</Button>
        </form>
      </CardContent>
    </Card>
  );
}
