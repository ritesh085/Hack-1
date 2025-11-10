"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import OTPVerification from "./otp-verification"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [showOTP, setShowOTP] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setShowOTP(true)
    setLoading(false)
  }

  if (showOTP) {
    return <OTPVerification email={email} onBack={() => setShowOTP(false)} />
  }

  return (
    <form onSubmit={handleSendOTP} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <Button
        type="submit"
        disabled={loading || !email}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Sending..." : "Send OTP"}
      </Button>

      <p className="text-center text-xs text-gray-600 mt-4">We'll send you a one-time code to verify your email</p>
    </form>
  )
}
