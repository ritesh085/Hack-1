"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, MapPin, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmergencyPage() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [loading, setLoading] = useState(true)
  const [alertActive, setAlertActive] = useState(false)

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLoading(false)
        },
        () => {
          setLoading(false)
        },
      )
    }
  }, [])

  const emergencyHospitals = [
    {
      id: 1,
      name: "City Hospital - Emergency Ward",
      urgency: "CRITICAL",
      bloodType: "O+",
      units: 5,
      distance: "2.5 km",
      alert: true,
    },
    {
      id: 2,
      name: "Apollo Hospital - Trauma Center",
      urgency: "HIGH",
      bloodType: "A+",
      units: 3,
      distance: "6.1 km",
      alert: false,
    },
    {
      id: 3,
      name: "Health Care Plus - Emergency",
      urgency: "MEDIUM",
      bloodType: "AB+",
      units: 2,
      distance: "5.2 km",
      alert: false,
    },
  ]

  const handleEmergencyAlert = () => {
    setAlertActive(!alertActive)
    if (!alertActive) {
      alert("✅ Emergency alert sent to 12 nearby hospitals!\nThey will contact you within minutes.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
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
        {/* Emergency Alert Box */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-orange-600 rounded-2xl p-8 text-white mb-8 shadow-2xl">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-10 h-10 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">Emergency Blood Alert</h2>
              <p className="text-red-100 mb-6">
                Notify nearby hospitals that you're available for immediate blood donation. Hospitals will send you
                their emergency requests.
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  onClick={handleEmergencyAlert}
                  className={`${
                    alertActive ? "bg-red-700 hover:bg-red-800 animate-pulse" : "bg-white hover:bg-red-50 text-red-600"
                  } font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-lg`}
                >
                  {alertActive ? "🔴 ALERT ACTIVE" : "🚨 ACTIVATE SOS"}
                </Button>
                <Button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                  📞 Get Help
                </Button>
              </div>

              {alertActive && (
                <div className="mt-6 bg-white/10 border-2 border-white rounded-lg p-4 animate-bounce">
                  <p className="text-sm font-semibold">✅ SOS Alert Status: ACTIVE</p>
                  <p className="text-xs text-red-100 mt-2">Alert sent to 12 hospitals near your location</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden mb-8 shadow-lg">
          <div className="h-80 bg-gradient-to-br from-red-100 to-orange-50 relative flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-red-400 mx-auto mb-4 animate-bounce" />
              <p className="text-gray-600 font-semibold">Emergency Response Map - Real-time Hospital Locations</p>
              {location && (
                <p className="text-sm text-gray-500 mt-2">
                  📍 Your Location: ({location.lat.toFixed(3)}, {location.lng.toFixed(3)})
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Requests */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Hospitals Requesting Blood</h2>
          <div className="grid gap-4">
            {emergencyHospitals.map((hospital) => (
              <div
                key={hospital.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 ${
                  hospital.alert
                    ? "bg-red-50 border-red-300 shadow-lg animate-pulse"
                    : "bg-white border-gray-200 hover:shadow-lg"
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{hospital.name}</h3>
                      <span
                        className={`font-bold text-xs px-3 py-1 rounded-full ${
                          hospital.urgency === "CRITICAL"
                            ? "bg-red-600 text-white"
                            : hospital.urgency === "HIGH"
                              ? "bg-orange-500 text-white"
                              : "bg-yellow-400 text-gray-900"
                        }`}
                      >
                        {hospital.urgency}
                      </span>
                    </div>
                  </div>
                  <span className="bg-rose-100 text-rose-700 font-bold px-4 py-2 rounded-lg">{hospital.distance}</span>
                </div>

                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Blood Type Needed</p>
                    <p className="text-lg font-bold text-gray-900">{hospital.bloodType}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Units Required</p>
                    <p className="text-lg font-bold text-gray-900">{hospital.units} units</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-600 font-semibold">Estimated Wait</p>
                    <p className="text-lg font-bold text-gray-900">3-5 mins</p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                  Accept Emergency Request
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
