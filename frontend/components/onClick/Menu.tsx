import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  AlignJustify,
  Archive,
  CircleStop,
  MessageCircleMore,
  Phone,
  Settings,
  Star,
} from "lucide-react";

export default function Menu() {
  const firstitems = [
    {
      icon: <MessageCircleMore />,
      name: "Search",
    },
    {
      icon: <Phone />,
      name: "Explore",
    },
    {
      icon: <CircleStop />,
      name: "Reel",
      href: "/reels",
    },
  ];

  const seconditems = [
    {
      icon: <Star />,
      name: "Home",
      href: "/",
    },
    {
      icon: <Archive />,
      name: "Search",
    },
    {
      icon: <Settings />,
      name: "Explore",
    },
    {
      icon: <CircleStop />,
      name: "Reel",
      href: "/reels",
    },
  ];

  return (
    <div>
      {/* {SHEET_SIDES.map((side) => ( */}
      <Sheet>
        <SheetTrigger asChild>
          <p className="opacity-60 pl-2 cursor-pointer">
            <AlignJustify />
          </p>
        </SheetTrigger>
        <SheetContent side="left">
          <div className="py-6 space-y-44">
            <div className="space-y-2">
            <p className="p-2"><AlignJustify /></p>
              {firstitems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center hover:bg-gray-100 cursor-pointer rounded-md py-2 pl-2"
                >
                  <p className="opacity-60">{item.icon}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {seconditems.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center hover:bg-gray-100 cursor-pointer rounded-md py-2 pl-2"
                >
                  <p className="opacity-60">{item.icon}</p>
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* ))} */}
    </div>
  );
}
