"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import OTPVerification from "./otp-verification"

export default function SignupForm() {
  const [step, setStep] = useState<"form" | "otp">("form")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [userType, setUserType] = useState<"donor" | "medical">("donor")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setStep("otp")
    setLoading(false)
  }

  if (step === "otp") {
    return <OTPVerification email={email} onBack={() => setStep("form")} isSignup />
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="John Doe"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

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

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+1 (555) 123-4567"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">I am a</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setUserType("donor")}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              userType === "donor"
                ? "bg-rose-100 text-rose-700 border-2 border-rose-600"
                : "bg-gray-100 text-gray-700 border-2 border-gray-300"
            }`}
          >
            Blood Donor
          </button>
          <button
            type="button"
            onClick={() => setUserType("medical")}
            className={`flex-1 py-2 px-3 rounded-lg font-medium text-sm transition-colors ${
              userType === "medical"
                ? "bg-rose-100 text-rose-700 border-2 border-rose-600"
                : "bg-gray-100 text-gray-700 border-2 border-gray-300"
            }`}
          >
            Medical Rep
          </button>
        </div>
      </div>

      <Button
        type="submit"
        disabled={loading || !email || !name || !phone}
        className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Create Account"}
      </Button>

      <p className="text-center text-xs text-gray-600 mt-4">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </p>
    </form>
  )
}
