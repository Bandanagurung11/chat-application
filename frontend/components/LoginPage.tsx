"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("username", formData.username);
    data.append("email", formData.email);
    data.append("password", formData.password);
    if (profilePic) {
      data.append("profile", profilePic);
    }
    try {
      const res = await axios.post(
        "https://chat-application-wl46.onrender.com/users",
        formData
      );

      if (res.status === 201) {
        console.log("User created:", res.data);
        router.push("/account"); // Redirect after successful signup
      }
    } catch (error) {
      if (error.response) {
        console.error("Signup failed:", error.response.data.message);
      } else {
        console.error("Error during signup:", error.message);
      }
    }
  };

  return (
    <div>
      <div className=" py-14 flex justify-center">
        <Tabs
          defaultValue="account"
          className="space-y-6 flex flex-col items-center"
        >
          <TabsList>
            <TabsTrigger className="text-base cursor-pointer" value="login">
              Log in
            </TabsTrigger>
            <TabsTrigger className="text-base cursor-pointer" value="signup">
              Sign up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="border shadow-xl p-6 rounded-md space-y-6">
              <div className="space-y-1">
                <p className="text-2xl font-bold">Login</p>
                <p className="opacity-60">
                  Enter your credentials to access your account
                </p>
              </div>
              <div>
                <p>Gmail</p>
                <Input type="email" placeholder="enter your email"></Input>
              </div>
              <div>
                <p>Password</p>
                <Input
                  placeholder="enter your password"
                  type="password"
                ></Input>
              </div>
              <p className="opacity-60 text-right cursor-pointer">
                Forgot password?
              </p>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  onClick={() => router.push("/account")}
                  className="cursor-pointer"
                >
                  Log in
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="signup">
            <div className="border shadow-xl p-6 rounded-md space-y-6">
              <div className="space-y-1">
                <p className="text-lg font-bold">Create an account</p>
                <p className="opacity-60">
                  Enter your information to create a new account
                </p>
              </div>
              <div>
                <p>Full name</p>
                <Input
                  type="text"
                  placeholder="enter your full name"
                  onChange={handleChange}
                ></Input>
              </div>
              <div>
                <p>Gmail</p>
                <Input
                  type="email"
                  placeholder="enter your email"
                  onChange={handleChange}
                ></Input>
              </div>
              <div>
                <p>Password</p>
                <Input
                  placeholder="enter your password"
                  type="password"
                  onChange={handleChange}
                ></Input>
              </div>
              <div>
                <p>Profile Picture</p>
                <Input type="file" onChange={handleFileChange} />
              </div>
              <div className="flex justify-center">
              <Button type="submit" onClick={handleSubmit}>Sign Up</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
