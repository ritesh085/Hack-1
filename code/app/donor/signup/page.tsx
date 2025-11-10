"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DonorSignupPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    city: "",
    bloodGroup: "",
    dateOfBirth: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.mobileNumber) {
        setError("Please fill in all required fields")
        return false
      }
      if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
        setError("Please enter a valid 10-digit mobile number")
        return false
      }
    } else if (step === 2) {
      if (!formData.city || !formData.bloodGroup || !formData.dateOfBirth) {
        setError("Please fill in all required fields")
        return false
      }
    }
    return true
  }

  const handleNextStep = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateStep()) return

    setLoading(true)
    localStorage.setItem("tempDonorPhone", formData.mobileNumber)
    localStorage.setItem("tempDonorName", formData.name)
    localStorage.setItem("donorSignupData", JSON.stringify(formData))

    setTimeout(() => {
      router.push("/donor/otp-verification")
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 flex items-center justify-center p-4 py-8">
      <Link href="/" className="absolute top-6 left-6">
        <button className="flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </Link>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-pulse">
            <span className="text-3xl text-white">💝</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Community</h1>
          <p className="text-gray-600">Step {step} of 2</p>
        </div>

        <div className="flex gap-2 mb-8">
          <div
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 1 ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gray-200"}`}
          ></div>
          <div
            className={`flex-1 h-2 rounded-full transition-all duration-500 ${step >= 2 ? "bg-gradient-to-r from-rose-500 to-pink-600" : "bg-gray-200"}`}
          ></div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl overflow-hidden h-32">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-sVPMDhFHaeJufIyVGTGzZl1jENUhiH.png"
              alt="World Blood Donor"
              className="w-full h-full object-cover"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Step 1: Personal Details */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-medium">+91</span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="Enter 10-digit number"
                      maxLength={10}
                      className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email <span className="text-gray-400 text-sm">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                  />
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Medical Details */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Blood Group <span className="text-rose-500">*</span>
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                  >
                    <option value="">Select your blood group</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Date of Birth <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-rose-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                  />
                </div>
              </>
            )}

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-pulse">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Button Group */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex-1 border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Back
                </Button>
              )}
              <Button
                type={step === 2 ? "submit" : "button"}
                onClick={() => step < 2 && handleNextStep()}
                disabled={loading}
                className={`flex-1 font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white`}
              >
                {loading ? "Creating Account..." : step === 2 ? "Complete Signup" : "Next"}
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/donor/login" className="text-rose-600 font-semibold hover:text-rose-700">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
