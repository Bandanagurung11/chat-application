"use client";
import {
  AlignJustify,
  Archive,
  CircleStop,
  MessageCircleMore,
  Phone,
  Settings,
  Star,
} from "lucide-react";
import React, { useState } from "react";
import Setting from "./onClick/Settings";
import Image from "next/image";

export interface Iuser{
   username:string;
   email:string;
   profile:string;
   password:string;
   _id:string;
}

export default function LeftFixed({ user }:{user:Iuser}) {
  const [isMenuOpen, setisMenuOpen] = useState<boolean>(false);
  const [openSetting, setopenSetting] = useState<boolean>(false);
  console.log(isMenuOpen);
  console.log(user._id);
  const firstitems = [
    {
      icon: <AlignJustify />,
    },
    {
      icon: <MessageCircleMore />,
      name: "Chats",
    },
    {
      icon: <Phone />,
      name: "Calls",
    },
    {
      icon: <CircleStop />,
      name: "Status",
    },
  ];

  const seconditems = [
    {
      icon: <Star />,
      name: "Starred Messages",
      href: "/",
    },
    {
      icon: <Archive />,
      name: "Archived chats",
    },
    {
      icon: <Settings />,
      name: "Settings",
    },
    // {
    //   // icon: <CircleStop />,
    //   icon: user.profile,
    //   name: "Profile",
    // },
  ];

  return (
    <div
      className={`fixed bg-white hidden lg:block md:block z-50 h-screen py-6 top-0 left-0 ${
        isMenuOpen ? "w-56" : "w-16"
      } transition-width duration-300 ease-in-out  border-r border-r-gray-200 px-2`}
    >
      <div className="space-y-44">
        <div className="space-y-2">
          {firstitems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center hover:bg-gray-100 cursor-pointer rounded-md py-2 pl-2"
              onClick={() => {
                if (index === 0) {
                  setisMenuOpen(!isMenuOpen);
                  console.log(isMenuOpen);
                }
              }}
            >
              <p className="opacity-60">{item.icon}</p>
              {isMenuOpen && <p>{item.name}</p>}
            </div>
          ))}
        </div>
        <div className="space-y-2">
          {seconditems.map((item, index) => (
            <div
              key={index}
              className="flex gap-4 items-center hover:bg-gray-100 cursor-pointer rounded-md py-2 pl-2"
              onClick={() => {
                if (index === 2) {
                  setopenSetting(!openSetting);
                }
              }}
            >
              <p className="opacity-60">{item.icon}</p>
              {isMenuOpen && <p>{item.name}</p>}
            </div>
          ))}

          {user?.profile && (
            <Image
              src={user.profile}
              alt="user profile"
              height={100}
              width={100}
            />
          )}
        </div>
        {openSetting && <Setting />}
      </div>
    </div>
  );
}
