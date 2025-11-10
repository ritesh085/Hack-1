"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DonorLoginPage() {
  const router = useRouter()
  const [mobileNumber, setMobileNumber] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!mobileNumber || !name) {
      setError("Please fill in all fields")
      return
    }

    if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setLoading(true)
    localStorage.setItem("tempDonorPhone", mobileNumber)
    localStorage.setItem("tempDonorName", name)
    localStorage.removeItem("donorSignupData")

    setTimeout(() => {
      router.push("/donor/otp-verification")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4">
      <Link href="/" className="absolute top-6 left-6">
        <button className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <span className="text-3xl text-white">🩸</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Donor</h1>
          <p className="text-gray-600">Login to save lives</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl overflow-hidden h-32">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zAwmu6JaAmfrg8uSUSZ4nzo3VtMHBm.png"
              alt="Blood Donation Connection"
              className="w-full h-full object-cover"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
            </div>

            {/* Mobile Number Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Mobile Number</label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">+91</span>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  placeholder="Enter 10-digit number"
                  maxLength={10}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                />
              </div>
              <p className="text-xs text-gray-500">Must start with 6-9</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-pulse">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-rose-200/50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">First time?</span>
            </div>
          </div>

          <Link href="/donor/signup">
            <Button className="w-full border-2 border-rose-500 text-rose-600 bg-transparent hover:bg-rose-50 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
              Create Account
            </Button>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-white/50 backdrop-blur rounded-xl p-4 text-center animate-fade-in">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-rose-600">💡 Tip:</span> Your information is secure and encrypted
          </p>
        </div>
      </div>
    </div>
  )
}
