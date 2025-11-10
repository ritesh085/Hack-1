"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import LoginForm from "@/components/auth/login-form"
import SignupForm from "@/components/auth/signup-form"

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login")

  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              +
            </div>
            <span className="text-xl font-bold text-gray-900">
              Blood<span className="text-rose-500">Connect</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 text-sm mt-2">Save lives, one donation at a time</p>
        </div>

        <Card className="border-0 shadow-lg">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 px-4 font-semibold text-sm transition-colors ${
                activeTab === "login" ? "text-rose-600 border-b-2 border-rose-600" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setActiveTab("signup")}
              className={`flex-1 py-4 px-4 font-semibold text-sm transition-colors ${
                activeTab === "signup"
                  ? "text-rose-600 border-b-2 border-rose-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">{activeTab === "login" ? <LoginForm /> : <SignupForm />}</div>
        </Card>

        {/* Footer Help */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Having trouble?{" "}
          <Link href="#" className="text-rose-600 hover:text-rose-700 font-semibold">
            Contact support
          </Link>
        </div>
      </div>
    </main>
  )
}
