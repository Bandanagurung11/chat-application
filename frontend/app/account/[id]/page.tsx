"use client"
import LeftFixed from "@/components/LeftFixed";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  ListFilter,
  MessageSquareHeart,
  Search,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";

export default function Page() {

  const [user, setUser] = useState(null);
  const router = useRouter();
  const params = useParams();
  const userId = params.id;

  const getuser= async()=>{
    try {
      const response = await axios.get(`https://chat-application-wl46.onrender.com/users/${userId}`
    )
    console.log(response.data);
      setUser(response.data.user);
    } catch (error) {
      console.log(error, "somethine went wrong");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("your are not log in yet");
      router.push("/"); // Not logged in, go to login
      return;
    }
    getuser();
  }, []);
  // console.log(user?.profile, "user details")
  console.log(user, "user")

  if (!user) return <div>Loading...</div>;
   //    {
      //   headers: { Authorization: `Bearer ${token}` },
      // }
  
  const friends = [
    {
      image:
        "https://images.unsplash.com/photo-1735093661171-22af5a2ff4c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fullname: "jasmine",
      lastmessage: "k x halkhabar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1735093661171-22af5a2ff4c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fullname: "jasmine",
      lastmessage: "k x halkhabar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1735093661171-22af5a2ff4c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fullname: "jasmine",
      lastmessage: "k x halkhabar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1735093661171-22af5a2ff4c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fullname: "jasmine",
      lastmessage: "k x halkhabar",
    },
    {
      image:
        "https://images.unsplash.com/photo-1735093661171-22af5a2ff4c6?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      fullname: "jasmine",
      lastmessage: "k x halkhabar",
    },
  ];
  return (
   <div>
    <LeftFixed user={user}/>
     <div className="lg:ml-16 lg:grid grid-cols-3">
        {/*  */}
      <div className=" pl-2 space-y-6 col-span-1 border-r border-r-gray-200">
        <div className=" fixed top-8 w-96 space-y-6">
          <div className="px-6">
            <div className="flex justify-between items-center">
              <p className="font-bold text-lg">Chats</p>
              <div className="flex gap-6">
                <SquarePen className="h-5 w-5" />
                <ListFilter className="h-5 w-5" />
              </div>
            </div>
          </div>
          <div className="relative">
            <Input className="pl-10 border-b border-b-green-400 hover:border-0" placeholder="Search or start a new chat"></Input>
            <Search className="absolute w-5 h-5 left-2 top-2 opacity-60" />
          </div>
        </div>
        <div className="fixed h-full top-32 overflow-y-auto w-96  space-y-4">
          {friends.map((friend, index) => (
            <div
              key={index}
              className="flex px-6 cursor-pointer py-2 gap-2 items-center hover:bg-gray-200"
            >
              <Image
                className="h-14 w-14 rounded-full"
                src={friend.image}
                alt="friend"
                height={100}
                width={100}
              ></Image>

              <div>
                <p className="text-sm">{friend.fullname} </p>

                <p className="text-sm opacity-60">{friend.lastmessage} . 13h</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-2 hidden lg:block md:block place-items-center place-content-center space-y-2 h-screen">
        {/* Outer circle */}
        <div className="w-24 h-24 border-2 border-black rounded-full flex items-center justify-center">
          {/* Inner circle */}
          {/* <div className="w-12 h-12 border-2 border-black rounded-full flex items-center justify-center"> */}
          {/* Placeholder for an icon */}
          <span className="text-xl">
          <MessageSquareHeart className="h-12 w-12" />
          </span>
        </div>
        {/* </div> */}
        <p className="text-lg font-bold">Your messages</p>
        <p className="text-sm opacity-60">Send a message to start a chat.</p>
        <Button className="bg-[#2aa0ef] hover:bg-[#0095F6]">
          Send message
        </Button>
        
      </div>
    </div>
   </div>
  );
}
