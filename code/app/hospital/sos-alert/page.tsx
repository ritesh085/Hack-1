"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, User, AlertCircle, Send } from "lucide-react"

export default function SOSAlertPage() {
  const router = useRouter()
  const [hospital, setHospital] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [alertType, setAlertType] = useState<"blood" | "oxygen" | "utility" | null>(null)
  const [selectedBloodType, setSelectedBloodType] = useState("O+")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("hospitalData")
    if (data) {
      setHospital(JSON.parse(data))
    }
  }, [])

  const handleSendAlert = async () => {
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      setAlertType(null)
    }, 3000)
  }

  const bloodTypes = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/hospital/dashboard">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
                +
              </div>
              <span className="text-xl font-bold text-gray-900">
                Blood<span className="text-blue-500">Connect</span>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfile && hospital && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Hospital Profile</h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="font-semibold">Name:</span> {hospital.hospitalName}
              </p>
              <p>
                <span className="font-semibold">Rep:</span> {hospital.representativeName}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {hospital.hospitalAddress}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {hospital.phone}
              </p>
            </div>
            <Button
              onClick={() => setShowProfile(false)}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center gap-3">
            <AlertCircle className="w-10 h-10 text-red-500" />
            Emergency SOS Alert
          </h1>
          <p className="text-gray-600">Send urgent requests to nearby hospitals and donors</p>
        </div>

        {/* Map Placeholder */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-lg border-2 border-gray-200">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <p className="text-gray-600 font-semibold">Hospital Location Map</p>
              <p className="text-sm text-gray-500 mt-2">Live donor nearby - 2.5 km away</p>
            </div>
          </div>
        </div>

        {/* Alert Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Blood Shortage */}
          <div
            onClick={() => setAlertType("blood")}
            className={`p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300 transform hover:scale-105 ${
              alertType === "blood"
                ? "border-red-500 bg-red-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-red-300"
            }`}
          >
            <div className="text-4xl mb-3">🩸</div>
            <h3 className="text-lg font-bold text-gray-900">Blood Shortage</h3>
            <p className="text-sm text-gray-600 mt-2">Request specific blood types</p>
          </div>

          {/* Oxygen Cylinders */}
          <div
            onClick={() => setAlertType("oxygen")}
            className={`p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300 transform hover:scale-105 ${
              alertType === "oxygen"
                ? "border-blue-500 bg-blue-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-blue-300"
            }`}
          >
            <div className="text-4xl mb-3">💨</div>
            <h3 className="text-lg font-bold text-gray-900">Oxygen Cylinders</h3>
            <p className="text-sm text-gray-600 mt-2">Request oxygen supply</p>
          </div>

          {/* Other Utility */}
          <div
            onClick={() => setAlertType("utility")}
            className={`p-6 rounded-2xl cursor-pointer border-2 transition-all duration-300 transform hover:scale-105 ${
              alertType === "utility"
                ? "border-yellow-500 bg-yellow-50 shadow-lg"
                : "border-gray-200 bg-white hover:border-yellow-300"
            }`}
          >
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="text-lg font-bold text-gray-900">Other Utility</h3>
            <p className="text-sm text-gray-600 mt-2">Request medical supplies</p>
          </div>
        </div>

        {/* Alert Details */}
        {alertType === "blood" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-red-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Select Blood Type Needed</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {bloodTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedBloodType(type)}
                  className={`py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    selectedBloodType === type
                      ? "bg-red-500 text-white shadow-lg"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            <Button
              onClick={handleSendAlert}
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending Alert...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Blood Alert for {selectedBloodType}
                </>
              )}
            </Button>
          </div>
        )}

        {alertType === "oxygen" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Oxygen Cylinder Request</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Number of Cylinders Needed</label>
              <input
                type="number"
                placeholder="Enter quantity"
                defaultValue="10"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <Button
              onClick={handleSendAlert}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending Alert...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Oxygen Alert
                </>
              )}
            </Button>
          </div>
        )}

        {alertType === "utility" && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border-2 border-yellow-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Other Medical Supplies</h3>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">Describe Your Requirement</label>
              <textarea
                placeholder="Enter details of medical supplies needed..."
                rows={4}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-500 focus:outline-none"
              />
            </div>
            <Button
              onClick={handleSendAlert}
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-bold py-4 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <span className="animate-spin">⏳</span>
                  Sending Alert...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Utility Alert
                </>
              )}
            </Button>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="fixed top-20 right-6 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-2 animate-bounce">
            <span>✓</span>
            Alert sent successfully!
          </div>
        )}
      </div>
    </div>
  )
}
