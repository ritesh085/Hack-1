"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, Phone, Droplet } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DonatePage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Get user's live location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLoading(false)
        },
        (err) => {
          setError("Please enable location services")
          setLoading(false)
        },
      )
    }
  }, [])

  // Sample hospitals with their locations
  const hospitals = [
    {
      id: 1,
      name: "City Hospital",
      address: "123 Main Street, Delhi",
      phone: "+91 9876543210",
      distance: "2.5 km",
      bloodTypes: ["O+", "O-", "A+"],
      emergency: true,
      lat: 28.7041,
      lng: 77.1025,
    },
    {
      id: 2,
      name: "Central Medical Center",
      address: "456 Park Avenue, Delhi",
      phone: "+91 9876543211",
      distance: "3.8 km",
      bloodTypes: ["B+", "AB+", "A-"],
      emergency: false,
      lat: 28.6129,
      lng: 77.23,
    },
    {
      id: 3,
      name: "Health Care Plus",
      address: "789 Oak Road, Delhi",
      phone: "+91 9876543212",
      distance: "5.2 km",
      bloodTypes: ["AB+", "AB-", "O+"],
      emergency: true,
      lat: 28.5355,
      lng: 77.391,
    },
    {
      id: 4,
      name: "Apollo Hospital",
      address: "321 Medical Plaza, Delhi",
      phone: "+91 9876543213",
      distance: "6.1 km",
      bloodTypes: ["All types available"],
      emergency: true,
      lat: 28.4595,
      lng: 77.025,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link href="/donor/dashboard">
            <button className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              +
            </div>
            <span className="text-lg font-bold text-gray-900">
              Blood<span className="text-rose-500">Connect</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Find Hospitals Near You</h1>
          <p className="text-gray-600">
            {loading
              ? "Getting your location..."
              : location
                ? `Location accessed: ${location.lat.toFixed(3)}, ${location.lng.toFixed(3)}`
                : error}
          </p>
        </div>

        {/* Map Section (Simulated) */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 shadow-lg">
          <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-50 relative flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <p className="text-gray-600 font-semibold">Interactive Map - Your Location & Nearby Hospitals</p>
              {location && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Current: ({location.lat.toFixed(3)}, {location.lng.toFixed(3)})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Hospitals List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Hospitals Nearby</h2>
          <div className="grid gap-4">
            {hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
                      {hospital.emergency && (
                        <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                          24/7 Emergency
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {hospital.address}
                    </p>
                  </div>
                  <span className="bg-rose-100 text-rose-700 font-bold px-4 py-2 rounded-lg text-lg">
                    {hospital.distance}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Contact</p>
                    <p className="text-gray-900 flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      {hospital.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Blood Types Needed</p>
                    <div className="flex gap-2 flex-wrap">
                      {hospital.bloodTypes.map((type) => (
                        <span
                          key={type}
                          className="bg-blue-100 text-blue-700 font-semibold text-sm px-3 py-1 rounded-full flex items-center gap-1"
                        >
                          <Droplet className="w-3 h-3" />
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Schedule Donation
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
