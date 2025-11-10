"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function HospitalOTPVerificationPage() {
  const router = useRouter()
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [timeLeft, setTimeLeft] = useState(60)
  const [verificationStep, setVerificationStep] = useState<"otp" | "nin2hfi-verification" | "complete">("otp")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const [mobileNumber, setMobileNumber] = useState("")
  const [hospitalData, setHospitalData] = useState<any>(null)

  useEffect(() => {
    const phone = localStorage.getItem("tempHospitalPhone") || ""
    const data = localStorage.getItem("tempHospitalData")
    setMobileNumber(phone)
    if (data) {
      setHospitalData(JSON.parse(data))
    }
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

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()

    if (otp.some((digit) => !digit)) {
      setError("Please enter all 6 digits")
      return
    }

    setLoading(true)
    setTimeout(() => {
      setVerificationStep("nin2hfi-verification")
      setLoading(false)
    }, 1000)
  }

  const handleVerifyNin2hfi = () => {
    setLoading(true)
    setError("")

    setTimeout(() => {
      if (hospitalData?.nin2hfi) {
        setVerificationStep("complete")
      } else {
        setError("NIN-2-HFI verification failed. Please check and try again.")
      }
      setLoading(false)
    }, 2000)
  }

  const handleComplete = () => {
    localStorage.removeItem("tempHospitalPhone")
    localStorage.removeItem("tempHospitalData")
    localStorage.setItem("hospitalData", JSON.stringify(hospitalData))
    router.push("/hospital/setup-profile")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4">
      <Link href="/hospital/login" className="absolute top-6 left-6">
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-3xl text-white">
              {verificationStep === "otp" ? "📱" : verificationStep === "nin2hfi-verification" ? "🔐" : "✓"}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {verificationStep === "otp"
              ? "Verify OTP"
              : verificationStep === "nin2hfi-verification"
                ? "Verify NIN-2-HFI"
                : "Registration Complete"}
          </h1>
          <p className="text-gray-600 text-sm">
            {verificationStep === "otp" && `Code sent to +91 ${mobileNumber}`}
            {verificationStep === "nin2hfi-verification" && "Checking with Ministry of Health database..."}
            {verificationStep === "complete" && "Your hospital is verified!"}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl overflow-hidden h-40">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-XfrsjPEradPDOXgojUEMqCbjIFDubn.jpeg"
              alt="First Aid"
              className="w-full h-full object-cover"
            />
          </div>

          {/* OTP Verification */}
          {verificationStep === "otp" && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                      className="w-12 h-12 text-center text-2xl font-bold border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-110"
                    />
                  ))}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-pulse">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              <div className="text-center">
                {timeLeft > 0 ? (
                  <p className="text-sm text-gray-600">
                    Resend in <span className="font-semibold text-blue-600">{timeLeft}s</span>
                  </p>
                ) : (
                  <button type="button" className="text-sm text-blue-600 font-semibold hover:text-blue-700">
                    Resend OTP
                  </button>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading || otp.some((digit) => !digit)}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </form>
          )}

          {verificationStep === "nin2hfi-verification" && (
            <div className="space-y-6">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded space-y-3">
                <p className="text-sm font-semibold text-blue-900">Verifying with Ministry of Health...</p>
                <div className="space-y-2 text-sm">
                  <p className="text-blue-800">
                    <span className="font-semibold">Hospital:</span> {hospitalData?.hospitalName}
                  </p>
                  <p className="text-blue-800">
                    <span className="font-semibold">NIN-2-HFI:</span> {hospitalData?.nin2hfi}
                  </p>
                  <p className="text-blue-800">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className="animate-pulse">Checking records...</span>
                  </p>
                </div>
              </div>

              <Button
                onClick={handleVerifyNin2hfi}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? "Verifying with Ministry..." : "Verify NIN-2-HFI"}
              </Button>
            </div>
          )}

          {verificationStep === "complete" && (
            <div className="space-y-6">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded space-y-3">
                <p className="text-sm font-semibold text-green-900">✓ Verification Successful!</p>
                <div className="space-y-2 text-sm text-green-800">
                  <p>
                    <span className="font-semibold">Hospital:</span> {hospitalData?.hospitalName}
                  </p>
                  <p>
                    <span className="font-semibold">Representative:</span> {hospitalData?.representativeName}
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> Verified with Ministry Database
                  </p>
                </div>
              </div>

              <Button
                onClick={handleComplete}
                className="w-full bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
              >
                Continue to Profile Setup
              </Button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-6 bg-white/50 backdrop-blur rounded-xl p-4 text-center animate-fade-in">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-blue-600">🔒 Secure:</span> All data is encrypted and verified with
            government
          </p>
        </div>
      </div>
    </div>
  )
}
