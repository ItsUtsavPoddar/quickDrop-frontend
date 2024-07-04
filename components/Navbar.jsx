"use client";
import React, { Children, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "@/utils/cn";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      <p className="text-black dark:text-white">
        The Navbar will show on top of the page
      </p>
    </div>
  );
}

export function Navbar({ className, children }) {
  const [active, setActive] = useState(null);
  return (
    <div className={cn(" inset-x-0 max-w-2xl mx-auto z-50 pb-2 ", className)}>
      <Menu setActive={setActive}>{children}</Menu>
    </div>
  );
}
