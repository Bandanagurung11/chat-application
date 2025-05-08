"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear error messages when user starts typing
    setErrorMessage("")

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMessage("")
    setSuccessMessage("")

    try {
      const res = await axios.post("https://chat-application-wl46.onrender.com/users/login", {
        username: formData.username,
        password: formData.password,
      })

      // Success case
      setSuccessMessage("Login successful! Redirecting to your account...")

      // Save token to localStorage
      localStorage.setItem("token", res.data.jwtToken)
      // localStorage.setItem("userId", res.data.user._id);
      const userId = res.data.user._id;

      setTimeout(() => {
        router.push(`/account/${userId}`);
        // router.push("/account");
        // router.push("/");
      }, 1500)
    } catch (err :unknown) {
      console.error("Login error:", err)

      if (axios.isAxiosError(err) && err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status } = err.response

        if (status === 404) {
          setErrorMessage("Account not found. It looks like you haven't signed up yet.Sign up first")
        } else if (status === 401) {
          setErrorMessage("Incorrect password. Please try again.")
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
  }

  return (
   <div className="bg-gray-100 w-full flex justify-center items-center mt-24 lg:mt-0 lg:h-screen">
     {/* <div className="flex  justify-center items-center "> */}
      <form onSubmit={handleLogin} className="bg-white rounded-lg z-50 max-w-md">
        <div className="border shadow-xl p-8 rounded-lg space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          {/* Error Message */}
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

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                disabled={isLoading}
                required
                className={errorMessage && errorMessage.includes("Account not found") ? "border-red-500" : ""}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                className={errorMessage && errorMessage.includes("Incorrect password") ? "border-red-500" : ""}
              />
            </div>

            <div className="text-right">
              <button type="button" className="text-sm text-muted-foreground hover:underline">
                Forgot password?
              </button>
            </div>
          </div>

          <Button type="submit" className=" cursor-pointer w-full" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log in"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Do not have an account?{" "}
            <button type="button" className="cursor-pointer text-base font-bold text-primary hover:underline" onClick={() => router.push("/signup")}>
              Sign up
            </button>
          </p>
        </div>
      </form>
    {/* </div> */}
   </div>
 
  )
}
