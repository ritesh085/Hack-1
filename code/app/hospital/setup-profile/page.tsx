"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

const HOSPITAL_TYPES = ["Government", "Private", "NGO", "Medical College"]
const DEPARTMENTS = ["Emergency", "General Ward", "ICU", "OPD", "Trauma Center", "Blood Bank"]
const STATES = ["Maharashtra", "Karnataka", "Tamil Nadu", "Delhi", "Uttar Pradesh", "Punjab", "Kerala", "Haryana"]

export default function HospitalSetupProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    hospitalName: "",
    registrationNumber: "",
    hospitalType: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
    email: "",
    medicalHead: "",
    medicalHeadPhone: "",
    bloodBankHead: "",
    bloodBankHeadPhone: "",
    totalBeds: "",
    emergencyBeds: "",
    departments: [] as string[],
    operatingHours: "24/7",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked
      const dept = (e.target as HTMLInputElement).value
      setFormData((prev) => ({
        ...prev,
        departments: checked ? [...prev.departments, dept] : prev.departments.filter((d) => d !== dept),
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
      if (!formData.hospitalName || !formData.registrationNumber || !formData.hospitalType) {
        alert("Please fill in all required fields")
        return
      }
    }

    // Validate step 2
    if (step === 2) {
      if (
        !formData.address ||
        !formData.city ||
        !formData.state ||
        !formData.pincode ||
        !formData.phone ||
        !formData.email
      ) {
        alert("Please fill in all contact fields")
        return
      }
    }

    // Validate step 3
    if (step === 3) {
      if (
        !formData.medicalHead ||
        !formData.medicalHeadPhone ||
        !formData.totalBeds ||
        formData.departments.length === 0
      ) {
        alert("Please fill in all required fields")
        return
      }
    }

    if (step < 4) {
      setStep(step + 1)
    } else {
      // Save profile
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("hospitalProfile", JSON.stringify(formData))
      setLoading(false)
      router.push("/hospital/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
              +
            </div>
            <span className="text-xl font-bold text-gray-900">
              Blood<span className="text-blue-500">Connect</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hospital Registration</h1>
          <p className="text-gray-600">
            Step {step} of 4 -{" "}
            {step === 1
              ? "Hospital Info"
              : step === 2
                ? "Contact Details"
                : step === 3
                  ? "Staff & Facilities"
                  : "Review & Confirm"}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8 flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-2 rounded-full transition-colors ${s <= step ? "bg-blue-500" : "bg-gray-300"}`}
            />
          ))}
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Step 1: Hospital Information */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Hospital Name *</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  placeholder="City Medical Hospital"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Registration Number *</label>
                <input
                  type="text"
                  name="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={handleInputChange}
                  placeholder="REG/2024/001"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Hospital Type *</label>
                <select
                  name="hospitalType"
                  value={formData.hospitalType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Hospital Type</option>
                  {HOSPITAL_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> Ensure your registration number is valid and recognized
                  by the Medical Council.
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Contact Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123 Medical Complex, Healthcare Street"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="hospital@email.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Staff & Facilities */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Medical Head Name *</label>
                  <input
                    type="text"
                    name="medicalHead"
                    value={formData.medicalHead}
                    onChange={handleInputChange}
                    placeholder="Dr. John Smith"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Medical Head Phone *</label>
                  <input
                    type="tel"
                    name="medicalHeadPhone"
                    value={formData.medicalHeadPhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Blood Bank Head Name</label>
                  <input
                    type="text"
                    name="bloodBankHead"
                    value={formData.bloodBankHead}
                    onChange={handleInputChange}
                    placeholder="Dr. Jane Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Blood Bank Head Phone</label>
                  <input
                    type="tel"
                    name="bloodBankHeadPhone"
                    value={formData.bloodBankHeadPhone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43211"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Total Beds *</label>
                  <input
                    type="number"
                    name="totalBeds"
                    value={formData.totalBeds}
                    onChange={handleInputChange}
                    placeholder="250"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Emergency Beds</label>
                  <input
                    type="number"
                    name="emergencyBeds"
                    value={formData.emergencyBeds}
                    onChange={handleInputChange}
                    placeholder="30"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-3">Available Departments *</label>
                <div className="grid grid-cols-2 gap-2">
                  {DEPARTMENTS.map((dept) => (
                    <label key={dept} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        value={dept}
                        checked={formData.departments.includes(dept)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-500 rounded"
                      />
                      <span className="text-gray-700 text-sm">{dept}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Hospital Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <p>
                    <span className="font-semibold">Name:</span> {formData.hospitalName}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {formData.hospitalType}
                  </p>
                  <p>
                    <span className="font-semibold">Reg. No:</span> {formData.registrationNumber}
                  </p>
                  <p>
                    <span className="font-semibold">Total Beds:</span> {formData.totalBeds}
                  </p>
                </div>
              </div>

              <div className="bg-cyan-50 rounded-lg p-6 space-y-4">
                <h3 className="font-bold text-gray-900">Contact Information</h3>
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
                  <p>
                    <span className="font-semibold">Email:</span> {formData.email}
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-6">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> By confirming, you certify that all information provided
                  is accurate and your hospital complies with blood donation guidelines.
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <Button onClick={() => setStep(step - 1)} disabled={step === 1} variant="outline" className="flex-1">
              Back
            </Button>
            <Button onClick={handleNext} disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
              {step === 4 ? (loading ? "Saving..." : "Complete Registration") : "Next"}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Your hospital information is secure and will be verified by our team.
        </p>
      </div>
    </div>
  )
}
