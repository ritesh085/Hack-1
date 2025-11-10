"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, User } from "lucide-react"

export default function InventoryPage() {
  const router = useRouter()
  const [hospital, setHospital] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [inventory, setInventory] = useState({
    "O+": "good",
    "O-": "medium",
    "A+": "good",
    "A-": "critical",
    "B+": "good",
    "B-": "medium",
    "AB+": "medium",
    "AB-": "critical",
  })

  useEffect(() => {
    const data = localStorage.getItem("hospitalData")
    if (data) {
      setHospital(JSON.parse(data))
    }
  }, [])

  const handleInventoryChange = (bloodType: string, status: string) => {
    setInventory({ ...inventory, [bloodType]: status })
    const updated = { ...inventory, [bloodType]: status }
    localStorage.setItem("hospitalInventory", JSON.stringify(updated))
  }

  const getStatusColor = (status: string) => {
    if (status === "good") return "bg-green-100 border-green-300 text-green-700"
    if (status === "medium") return "bg-yellow-100 border-yellow-300 text-yellow-700"
    return "bg-red-100 border-red-300 text-red-700"
  }

  const getStatusBadgeColor = (status: string) => {
    if (status === "good") return "bg-green-500"
    if (status === "medium") return "bg-yellow-500"
    return "bg-red-500"
  }

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
                <span className="font-semibold">Position:</span> {hospital.position}
              </p>
              <p>
                <span className="font-semibold">Phone:</span> {hospital.phone}
              </p>
              <p>
                <span className="font-semibold">NIN-2-HFI:</span> {hospital.nin2hfi}
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Update Inventory</h1>
          <p className="text-gray-600">Manage blood availability status for your hospital</p>
        </div>

        {/* Blood Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(inventory).map(([bloodType, status]) => (
            <div
              key={bloodType}
              className={`rounded-xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${getStatusColor(status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{bloodType}</h3>
                <div className={`w-4 h-4 rounded-full ${getStatusBadgeColor(status)}`}></div>
              </div>

              <div className="space-y-3">
                {(["good", "medium", "critical"] as const).map((option) => (
                  <button
                    key={option}
                    onClick={() => handleInventoryChange(bloodType, option)}
                    className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                      status === option
                        ? option === "good"
                          ? "bg-green-500 text-white shadow-lg"
                          : option === "medium"
                            ? "bg-yellow-500 text-white shadow-lg"
                            : "bg-red-500 text-white shadow-lg"
                        : "bg-white/50 hover:bg-white/80 text-gray-700"
                    }`}
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8 flex justify-center">
          <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 active:scale-95 transition-all">
            Save Inventory Status
          </Button>
        </div>
      </div>
    </div>
  )
}
