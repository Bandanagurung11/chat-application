// import React from 'react'
// import { Card } from '../ui/card'

// export default function Settings() {
//   return (
//         <Card className='absolute bottom-28 left-4 h-12 w-24'>
//           <div>

//           </div>
            
//         </Card>
//   )
// }

import type React from "react"
import { Globe, MessageCircle, Monitor, Bell, Paintbrush, HardDrive, Command, HelpCircle, User } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"


export default function Settings() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-60 bg-white border-r">
        <nav className="p-4 space-y-1">
          <SidebarItem icon={<Monitor size={20} />} label="General" active />
          <SidebarItem icon={<User size={20} />} label="Account" />
          <SidebarItem icon={<MessageCircle size={20} />} label="Chats" />
          <SidebarItem icon={<Monitor size={20} />} label="Video & voice" />
          <SidebarItem icon={<Bell size={20} />} label="Notifications" />
          <SidebarItem icon={<Paintbrush size={20} />} label="Personalization" />
          <SidebarItem icon={<HardDrive size={20} />} label="Storage" />
          <SidebarItem icon={<Command size={20} />} label="Shortcuts" />
          <SidebarItem icon={<HelpCircle size={20} />} label="Help" />
          <div className="pt-4 mt-4 border-t">
            <SidebarItem icon={<User size={20} />} label="Profile" />
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">General</h1>

        {/* Login Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Login</h2>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Start WhatsApp at login</span>
            <Switch />
          </div>
        </section>

        {/* Language Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Language</h2>
          <div className="relative">
            <div className="flex items-center border rounded-md p-2 bg-white">
              <Globe className="mr-2 text-gray-500" size={20} />
              <span>System default</span>
              <div className="absolute right-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-500"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* Typing Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">Typing</h2>
          <p className="text-gray-600 mb-2">
            Change typing settings for <span className="font-medium">autocorrect</span> and{" "}
            <span className="font-medium">misspelled highlight</span> from{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Windows Settings
            </Link>
            .
          </p>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Replace text with emoji</h3>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Emoji will replace specific text as you type.</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl">😃</span>
                <Switch checked={true} />
              </div>
            </div>
            <Link href="#" className="text-green-600 hover:underline block mt-2">
              See list of text
            </Link>
          </div>
        </section>

        <div className="mt-10 pt-6 border-t">
          <p className="text-gray-600">
            To <span className="font-medium">log out</span> of WhatsApp on this computer go to your{" "}
            <Link href="#" className="text-green-600 hover:underline">
              Profile
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

interface SidebarItemProps {
  icon: React.ReactNode
  label: string
  active?: boolean
}

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
  return (
    <div
      className={`flex items-center p-2 rounded-md ${active ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100"}`}
    >
      <div className="mr-3">{icon}</div>
      <span>{label}</span>
    </div>
  )
}

