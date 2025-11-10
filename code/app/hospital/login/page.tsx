"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function HospitalLoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    representativeName: "",
    position: "",
    mobileNumber: "",
    hospitalName: "",
    hospitalAddress: "",
    nin2hfi: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (
      !formData.representativeName ||
      !formData.position ||
      !formData.mobileNumber ||
      !formData.hospitalName ||
      !formData.hospitalAddress ||
      !formData.nin2hfi
    ) {
      setError("Please fill in all fields")
      return
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    if (!/^\d{9}$/.test(formData.nin2hfi)) {
      setError("NIN-2-HFI must be 9 digits")
      return
    }

    setLoading(true)

    localStorage.setItem("tempHospitalPhone", formData.mobileNumber)
    localStorage.setItem("tempHospitalData", JSON.stringify(formData))

    setTimeout(() => {
      router.push("/hospital/otp-verification")
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center p-4 py-8">
      <Link href="/" className="absolute top-6 left-6">
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </Link>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce">
            <span className="text-3xl text-white">🏥</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Representative</h1>
          <p className="text-gray-600">Register your hospital</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6 transform transition-all hover:shadow-2xl">
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl overflow-hidden h-40">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-alrihj97rJf8v4dLe0lpO6XCkpSLyJ.jpg"
              alt="Blood Donation Guidelines"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">🔐 Secure Registration:</span> Your hospital will be verified against the
              Ministry of Health & Family Welfare NIN-2-HFI database
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Representative Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Representative Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="representativeName"
                value={formData.representativeName}
                onChange={handleChange}
                placeholder="Full name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Position in Hospital <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="e.g., Medical Director, Blood Bank Manager"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
            </div>

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">+91</span>
                <input
                  type="tel"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
                />
              </div>
            </div>

            {/* Hospital Name */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Hospital Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                placeholder="Full hospital name"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
            </div>

            {/* Hospital Address */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Hospital Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="hospitalAddress"
                value={formData.hospitalAddress}
                onChange={handleChange}
                placeholder="Complete hospital address"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                NIN-2-HFI Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="nin2hfi"
                value={formData.nin2hfi}
                onChange={handleChange}
                placeholder="9-digit NIN-2-HFI number"
                maxLength={9}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 hover:bg-white transform hover:scale-105"
              />
              <p className="text-xs text-gray-500">
                National Institutional Number from Ministry of Health & Family Welfare
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded animate-pulse">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-200/50"
            >
              {loading ? "Verifying with Ministry..." : "Register & Verify"}
            </Button>
          </form>
        </div>

        <div className="mt-6 bg-white/50 backdrop-blur rounded-xl p-4 space-y-2 animate-fade-in">
          <p className="text-sm font-semibold text-blue-600">📋 What is NIN-2-HFI?</p>
          <p className="text-xs text-gray-600">
            The National Institutional Number for Health Facilities in India, assigned by the Ministry of Health &
            Family Welfare. Your hospital must be registered in the government database for verification.
          </p>
        </div>
      </div>
    </div>
  )
}
