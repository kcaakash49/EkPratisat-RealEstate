"use client";

import { signupaction } from "@/action/signupaction";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Loading from "./Loading";
import { Role } from "@prisma/client";
import { signUpSchema, SignUpSchema } from "@/zod/schema";
import Header from "./Header";

interface ResponseType {
  message?: string,
  error?: {
    fullname?: string,
    email?: string,
    mobile?: string,
    password?: string,
    error?: string
    
  },
  status: number
}

export function Signup() {
  const [formData, setFormData] = useState<SignUpSchema>({
    fullname: "",
    email: "",
    password: "",
    mobile: "",
    role: Role.USER,
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>({});
  const [message, setMessage] = useState("");
  const [isVisible, setVisible] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError({});
    setMessage("");
    setLoading(true);
    try {
      const response: ResponseType = await signupaction(formData);
      console.log("response", response.error);
      setLoading(false);
      if (response.error) {
        setError(response.error);
      } else {
        setMessage(response.message || "");
        router.push("/")
      }
    } catch (e) {
      setError({ error: "something happened" });
      console.log(error);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content container */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="John Doe"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {error?.fullname && (
                <p className="text-red-500 text-sm text-center">
                  {error.fullname}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile
              </label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="98********"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                pattern="^\d{10}$"
                title="Number must be exactly 10 digits"
                required
              />
              {error?.mobile && (
                <p className="text-red-500 text-sm text-center">{error.mobile}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.com"
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
              {error?.email && (
                <p className="text-red-500 text-sm text-center">{error.email}</p>
              )}
            </div>

            {/* Role */}
            {/* <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
                required
              >
                <option value="USER">User</option>
                <option value="PARTNER">Partner</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div> */}

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                  type={isVisible ? "text" : "password"}
                  placeholder="Password"
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  value={formData.password}
                  required
                  id="password"
                  name="password"
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center"
                  onClick={() => setVisible(!isVisible)}
                >
                  {isVisible ? "🙈" : "👁️"}
                </button>
              </div>
            </div>
            {error?.password && <p className="text-red-500 text-sm text-center">{error.password}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? <Loading /> : "Sign Up"}
            </button>
          </form>

          {error?.error && (
            <p className="text-red-500 text-sm text-center p-2">{error.error}</p>
          )}
          {message && <p className="text-green-600 text-sm p-2 text-center">{message}</p>}

          <p className="text-sm text-gray-500 text-center mt-4">
            Already have an account?{" "}
            <a href="/auth/signin" className="text-blue-600 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>


  );
}
