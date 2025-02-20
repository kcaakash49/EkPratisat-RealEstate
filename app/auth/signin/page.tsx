"use client";

import { useState } from "react";
import { getSession, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import Header from "@/components/Header";

export default function SignIn() {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("");
  const [isVisible, setVisible] = useState(false)
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Call the NextAuth signIn function with "credentials"
    setLoading(true)
    const result = await signIn("credentials", {
      redirect: false, // Prevent automatic redirection
      mobile,
      password,
    });
    setLoading(false)
    console.log("result in signin", result)
    if (result?.status == 401) {
      setError("Wrong username or password")
      return
    }
    // const session = await fetch("/api/auth/session").then((res) => res.json());
    const session = await getSession();
    console.log(session)

    if(session?.user?.role === "ADMIN"){
      router.push("/admin")
    }else {
      router.push("/")
    }

  };

  return (
    <div className="h-full flex flex-col">
  {/* Header */}
  <Header />

  {/* Main content container */}
  <div className="flex-grow flex justify-center items-center">
    <div className="p-8 bg-white bg-opacity-70 shadow-2xl rounded-lg max-w-md w-full">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        Sign In
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Mobile */}
        <input
          type="text"
          placeholder="98********"
          className="border p-3 rounded-lg"
          id="mobile"
          onChange={(e) => setMobile(e.target.value)}
        />

        {/* Password */}
        <div className="relative">
          <input
            type={isVisible ? "text" : "password"}
            placeholder="Password"
            className="border p-3 rounded-lg w-full pr-10"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center"
            onClick={() => setVisible(!isVisible)}
          >
            {isVisible ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Submit Button */}
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? <Loading /> : "Sign In"}
        </button>
      </form>

      {/* Sign Up Link */}
      <div className="flex justify-center mt-6 gap-2">
        <p className="text-gray-600">Don’t have an account?</p>
        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className="text-blue-500 underline"
        >
          Sign Up
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
    </div>
  </div>
</div>

  );
}
