"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

const BLOOD_TYPES = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]
const STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", "Punjab", "Kerala", "Haryana"]

export default function SetupProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    bloodType: "",
    weight: "",
    lastDonation: "",
    medicalConditions: [],
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      const condition = (e.target as HTMLInputElement).value
      setFormData((prev) => ({
        ...prev,
        medicalConditions: checked
          ? [...prev.medicalConditions, condition]
          : prev.medicalConditions.filter((c) => c !== condition),
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleNext = async () => {
    // Validate step 1
    if (step === 1) {
      if (!formData.fullName || !formData.age || !formData.bloodType || !formData.weight) {
        alert("Please fill in all required fields")
        return
      }
    }

    // Validate step 2
    if (step === 2) {
      if (!formData.address || !formData.city || !formData.state || !formData.pincode) {
        alert("Please fill in all address fields")
        return
      }
    }

    if (step < 3) {
      setStep(step + 1)
    } else {
      // Save profile
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("donorProfile", JSON.stringify(formData))
      setLoading(false)
      router.push("/donor/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              +
            </div>
            <span className="text-xl font-bold text-gray-900">
              Blood<span className="text-rose-500">Connect</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">
            Step {step} of 3 -{" "}
            {step === 1 ? "Medical Information" : step === 2 ? "Location & Contact" : "Review & Confirm"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${s <= step ? "bg-rose-500" : "bg-gray-300"}`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Medical Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Age *</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="25"
                    min="18"
                    max="65"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Blood Type *</label>
                  <select
                    name="bloodType"
                    value={formData.bloodType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Select Blood Type</option>
                    {BLOOD_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Weight (kg) *</label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="70"
                    min="45"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Last Donation Date</label>
                <input
                  type="date"
                  name="lastDonation"
                  value={formData.lastDonation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Medical Conditions</label>
                <div className="space-y-2">
                  {["Diabetes", "High Blood Pressure", "Heart Disease", "Asthma", "None"].map((condition) => (
                    <label key={condition} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        value={condition}
                        checked={formData.medicalConditions.includes(condition)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-rose-500 rounded"
                      />
                      <span className="text-gray-700">{condition}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Location & Contact */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Main Street, Apt 4B"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  >
                    <option value="">Select State</option>
                    {STATES.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Pincode *</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="400001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Emergency Contact Name</label>
                  <input
                    type="text"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="Jane Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Emergency Phone</label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43211"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-rose-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span> {formData.fullName}
                  </p>
                  <p>
                    <span className="font-semibold">Age:</span> {formData.age}
                  </p>
                  <p>
                    <span className="font-semibold">Blood Type:</span> {formData.bloodType}
                  </p>
                  <p>
                    <span className="font-semibold">Weight:</span> {formData.weight} kg
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Location & Contact</h3>
                <div className="text-sm space-y-2">
                  <p>
                    <span className="font-semibold">Address:</span> {formData.address}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {formData.city}, {formData.state} {formData.pincode}
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span> {formData.phone}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> By confirming, you agree to provide accurate medical
                  information and understand the blood donation guidelines.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <Button onClick={() => setStep(step - 1)} disabled={step === 1} variant="outline" className="flex-1">
              Back
            </Button>
            <Button onClick={handleNext} disabled={loading} className="flex-1 bg-rose-600 hover:bg-rose-700 text-white">
              {step === 3 ? (loading ? "Saving..." : "Complete Profile") : "Next"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Your information is secure and only used to match you with donation requests.
        </p>
      </div>
    </div>
  )
}
