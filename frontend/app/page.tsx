// app/page.js or pages/index.js (depending on your setup)
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoginPage from "@/components/LoginPage";
import Account from "@/components/Account";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // true if token exists
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };


  return (
    <div>
       {isLoggedIn ?<Account/> : <LoginPage />}
       <Button
            onClick={() => {
              localStorage.removeItem("token");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </Button>
   
      
    </div>
  );
}
