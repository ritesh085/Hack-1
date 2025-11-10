"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DonorOTPVerificationPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [mobileNumber, setMobileNumber] = useState("")
  const [donorName, setDonorName] = useState("")

  useEffect(() => {
    const phone = localStorage.getItem("tempDonorPhone") || ""
    const name = localStorage.getItem("tempDonorName") || ""
    setMobileNumber(phone)
    setDonorName(name)
  }, [])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.some((digit) => !digit)) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    // Simulate OTP verification
    setTimeout(() => {
      const signupData = localStorage.getItem("donorSignupData")
      if (signupData) {
        const parsedData = JSON.parse(signupData)
        const donorProfile = {
          name: parsedData.name,
          phone: parsedData.mobileNumber,
          email: parsedData.email || "",
          bloodGroup: parsedData.bloodGroup,
          dob: parsedData.dateOfBirth,
          city: parsedData.city,
          verified: true,
          joinDate: new Date().toISOString(),
        }
        localStorage.setItem("donorData", JSON.stringify(donorProfile))
        // Clear temp signup data
        localStorage.removeItem("donorSignupData")
        localStorage.removeItem("tempDonorPhone")
        localStorage.removeItem("tempDonorName")
        // Redirect to dashboard directly
        router.push("/donor/dashboard")
      } else {
        // Login flow - redirect to dashboard
        router.push("/donor/dashboard")
      }
      setLoading(false)
    }, 1000)
  }

  const handleResendOtp = () => {
    if (timeLeft === 0) {
      setTimeLeft(60)
      setError("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4">
      {/* Back Button */}
      <Link href="/donor/login" className="absolute top-6 left-6">
        <button className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-3xl text-white">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify OTP</h1>
          <p className="text-gray-600">
            We've sent a code to <span className="font-semibold text-gray-900">+91 {mobileNumber}</span>
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Image Banner */}
          <div className="bg-gradient-to-r from-rose-100 to-pink-100 rounded-xl p-6 text-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-DHLkLiWfBX8UoXrjAKgMAMjOzGuyFL.jpg"
              alt="Blood Donation"
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input Fields */}
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">Enter 6-digit OTP</label>
              <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    maxLength={1}
                    className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none transition-colors bg-gray-50 hover:bg-white"
                  />
                ))}
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Resend OTP */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-600">
                  Resend OTP in <span className="font-semibold text-rose-600">{timeLeft}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-sm text-rose-600 font-semibold hover:text-rose-700 transition-colors"
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || otp.some((digit) => !digit)}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </form>
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-white/50 backdrop-blur rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-rose-600">💡 Tip:</span> Check your SMS for the 6-digit code
          </p>
        </div>
      </div>
    </div>
  )
}
