"use client";

import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import SidebarItem from "./SidebarItem";
import { User } from "@prisma/client";
import Avatar from "./Avatar";

type Props = {
  currentUser: User | null;
};

function SidebarComponent({ currentUser }: Props) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
      <nav className="mt-4 flex flex-col justify-between">
        <ul role="list" className="flex flex-col space-y-1 items-center">
          {routes?.map((route) => (
            <SidebarItem
              key={route.label}
              label={route.label}
              href={route.href}
              icon={route.icon}
              onClick={route.onClick}
              active={route.active}
            />
          ))}
        </ul>
      </nav>
      <nav className="mt-4 flex flex-col justify-between items-center">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hover:opacity-75 transition"
        >
          <Avatar user={currentUser} />
        </div>
      </nav>
    </div>
  );
}

export default SidebarComponent;