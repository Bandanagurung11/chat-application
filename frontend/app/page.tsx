
// "use client";
// import LoginPage from "@/components/LoginPage";
// export default function Page() {
//   return (
//     <div>
//        <LoginPage />
//     </div>
//   );
// }
import React, { useEffect } from 'react'
import { cometChatInit } from '../config/cometChatConfig.js'

export default function Page() {
  useEffect(() => {
    cometChatInit();  // Initialize CometChat when app loads
  }, []);
  return (
    <div>page</div>
  )
}
