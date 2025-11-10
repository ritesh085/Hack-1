"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, User, Phone, MapPin, Droplet } from "lucide-react"

export default function DonorChartPage() {
  const [hospital, setHospital] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [selectedDonor, setSelectedDonor] = useState<any>(null)

  const donors = [
    {
      id: 1,
      name: "Raj Kumar",
      bloodType: "O+",
      distance: "1.2 km",
      phone: "+91 9876543210",
      location: "Near Metro Station",
      lastDonation: "3 months ago",
      status: "Available",
      donationCount: 12,
      avatar: "👨",
    },
    {
      id: 2,
      name: "Priya Singh",
      bloodType: "A+",
      distance: "2.1 km",
      phone: "+91 9876543211",
      location: "Sector 5",
      lastDonation: "2 months ago",
      status: "Available",
      donationCount: 8,
      avatar: "👩",
    },
    {
      id: 3,
      name: "Ahmed Hassan",
      bloodType: "B-",
      distance: "3.5 km",
      phone: "+91 9876543212",
      location: "City Center",
      lastDonation: "6 months ago",
      status: "Waiting Period",
      donationCount: 5,
      avatar: "👨",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      bloodType: "AB+",
      distance: "4.2 km",
      phone: "+91 9876543213",
      location: "Downtown",
      lastDonation: "1 month ago",
      status: "Available",
      donationCount: 15,
      avatar: "👩",
    },
  ]

  useEffect(() => {
    const data = localStorage.getItem("hospitalData")
    if (data) {
      setHospital(JSON.parse(data))
    }
  }, [])

  const getStatusColor = (status: string) => {
    if (status === "Available") return "bg-green-100 text-green-700"
    return "bg-yellow-100 text-yellow-700"
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

      {/* Donor Detail Modal */}
      {selectedDonor && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Donor Details</h3>
              <button onClick={() => setSelectedDonor(null)} className="text-gray-500 hover:text-gray-900 text-2xl">
                ×
              </button>
            </div>

            <div className="text-center mb-6">
              <div className="text-6xl mb-3">{selectedDonor.avatar}</div>
              <h4 className="text-lg font-bold text-gray-900">{selectedDonor.name}</h4>
              <div className="flex justify-center gap-2 mt-2">
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                  <Droplet className="w-4 h-4" />
                  {selectedDonor.bloodType}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${getStatusColor(selectedDonor.status)}`}>
                  {selectedDonor.status}
                </span>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-semibold text-gray-900">{selectedDonor.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-semibold text-gray-900">{selectedDonor.location}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-bold text-gray-900">{selectedDonor.distance}</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Donations</p>
                  <p className="font-bold text-gray-900">{selectedDonor.donationCount}</p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setSelectedDonor(null)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Available Donor List</h1>
          <p className="text-gray-600">Connect with verified donors near your hospital</p>
        </div>

        {/* Donor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {donors.map((donor) => (
            <div
              key={donor.id}
              onClick={() => setSelectedDonor(donor)}
              className="bg-white rounded-2xl shadow-md border-2 border-gray-100 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 cursor-pointer transform hover:scale-105"
            >
              {/* Card Content */}
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-5xl mb-3">{donor.avatar}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{donor.name}</h3>

                <div className="flex gap-2 mb-4 justify-center flex-wrap">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                    <Droplet className="w-4 h-4" />
                    {donor.bloodType}
                  </span>
                </div>

                <div className="w-full space-y-2 text-sm mb-4 py-3 border-y border-gray-200">
                  <p className="text-gray-600">
                    <span className="font-semibold">📍</span> {donor.distance}
                  </p>
                  <p className="text-gray-600">
                    <span className="font-semibold">⏱️</span> {donor.lastDonation}
                  </p>
                </div>

                <div className={`w-full px-3 py-2 rounded-lg text-sm font-bold mb-4 ${getStatusColor(donor.status)}`}>
                  {donor.status}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transform hover:scale-105 active:scale-95 transition-all">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
