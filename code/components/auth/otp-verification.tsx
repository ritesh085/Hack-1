"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface OTPVerificationProps {
  email: string
  onBack: () => void
  isSignup?: boolean
}

export default function OTPVerification({ email, onBack, isSignup }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)
  const [canResend, setCanResend] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true)
      return
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
    return () => clearTimeout(timer)
  }, [timeLeft])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`) as HTMLInputElement
      nextInput?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`) as HTMLInputElement
      prevInput?.focus()
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Redirect to appropriate dashboard
    if (isSignup) {
      router.push("/dashboard/setup-profile")
    } else {
      router.push("/dashboard")
    }
    setLoading(false)
  }

  const handleResend = async () => {
    setTimeLeft(60)
    setCanResend(false)
    // Simulate resend API call
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  const otpFilled = otp.every((digit) => digit !== "")

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Verify Your Email</h2>
        <p className="text-sm text-gray-600">
          We've sent a 6-digit code to
          <br />
          <span className="font-semibold text-gray-900">{email}</span>
        </p>
      </div>

      <form onSubmit={handleVerify} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Enter Code</label>
          <div className="flex gap-2 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              />
            ))}
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading || !otpFilled}
          className="w-full bg-rose-600 hover:bg-rose-700 text-white font-semibold py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Verify"}
        </Button>
      </form>

      <div className="text-center space-y-3">
        {canResend ? (
          <button onClick={handleResend} className="text-rose-600 hover:text-rose-700 text-sm font-semibold">
            Didn't receive code? Resend
          </button>
        ) : (
          <p className="text-xs text-gray-600">
            Resend code in <span className="font-bold">{timeLeft}s</span>
          </p>
        )}

        <button onClick={onBack} className="block w-full text-gray-600 hover:text-gray-900 text-sm font-medium mt-2">
          Back
        </button>
      </div>
    </div>
  )
}
