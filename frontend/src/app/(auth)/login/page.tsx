"use client";

import React, { useEffect, useState } from "react";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Link from "next/link";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const errorParam = params.get("error");
      if (errorParam) {
        setError(decodeURIComponent(errorParam));
      }
    }
  }, []);

  const handleLogin = async (e:any) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: true,
      email,
      password,
      callbackUrl: "/",
    });

    // no need to manually check res.error here since error will be handled via redirect URL
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <div className="flex items-center justify-center mb-6">
          <ShieldCheck className="w-8 h-8 text-blue-600" />
          <span className="ml-2 text-xl font-semibold text-gray-800">
            User Login
          </span>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute top-3.5 left-3 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Forgot your password?{" "}
          <Link
            href="#"
            // href="/reset-password"
            className="text-blue-600 hover:underline"
          >
            Reset
          </Link>
        </div>
      </motion.div>
    </main>
  );
};

export default page;
