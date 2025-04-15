"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

export default function Page() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setErrorMessage("")
    setSuccessMessage("")
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (profilePic) {
      data.append("profile", profilePic)
    }
    try {
      const res = await axios.post(
        "https://chat-application-wl46.onrender.com/users",
        data
      );

      if (res.status === 201) {
        console.log("User created:", res.data)
        setSuccessMessage("Account created successfully!")
        setTimeout(() => {
          router.push("/") // Redirect after successful signup
        }, 1500)
      }
    } catch (err:unknown) {
      console.error("Login error:", err)

      if (axios.isAxiosError(err) && err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status } = err.response

        if (status === 409) {
          setErrorMessage("Account already exit.Try login instead.")
        } else if (status === 400) {
          setErrorMessage("Please Upload Profile Pciture.")
        } else {
          setErrorMessage("An unexpected error occurred. Please try again later.")
        }
      } else if (axios.isAxiosError(err) && err.request) {
        // The request was made but no response was received
        setErrorMessage("Unable to connect to the server. Please check your internet connection.")
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("An unexpected error occurred. Please try again later.")
      }
    } finally {
      setIsLoading(false)
    }
    
  };
  return (
    <div  className="flex mt-12 justify-center items-center min-h-[80vh]">
        <div className="border shadow-xl p-6 rounded-md space-y-6">
            <div className="space-y-1">
              <p className="text-lg font-bold">Create an account</p>
             <p className="opacity-60">
                Enter your information to create a new account
             </p>
            </div>
            {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md flex items-start gap-2">
              <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Success Message */}
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p>{successMessage}</p>
            </div>
          )}
            <div>
               <p>Full name</p>
               <Input
                 id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required
               ></Input>
             </div>
             <div>
               <p>Gmail</p>
               <Input
              id="email"
                type="text"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                required
               ></Input>
             </div>
             <div>
              <p>Password</p>
              <Input
               id="password"
               type="password"
               name="password"
               placeholder="Enter your password"
               value={formData.password}
               onChange={handleChange}
               disabled={isLoading}
               required
               ></Input>
             </div>
             <div>
               <p>Profile Picture</p>
               <Input type="file" onChange={handleFileChange} />
             </div>
             <div className="flex justify-center">
               <Button className='cursor-pointer' type="submit" disabled={isLoading} onClick={handleSubmit}>
               {isLoading ? "Signing up..." : "Sign Up"}
               </Button>
             </div>
           </div>
    </div>
  )
}
