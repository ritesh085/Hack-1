"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, User, LogOut } from "lucide-react"

export default function DonorDashboard() {
  const [donor, setDonor] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("donorData")
    if (data) {
      setDonor(JSON.parse(data))
    } else {
      // Redirect if not authenticated
      window.location.href = "/donor/login"
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("donorData")
    localStorage.removeItem("tempDonorPhone")
    localStorage.removeItem("tempDonorName")
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left - Back Button */}
          <Link href="/">
            <button className="flex items-center gap-2 text-gray-600 hover:text-rose-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
          </Link>

          {/* Center - Logo and Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
              +
            </div>
            <span className="text-xl font-bold text-gray-900">
              Blood<span className="text-rose-500">Connect</span>
            </span>
          </div>

          {/* Right - Profile & Notifications */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <Bell className="w-6 h-6" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-3 z-50">
                  <div className="border-b border-gray-200 pb-2">
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    <div className="bg-rose-50 p-3 rounded-lg border-l-4 border-rose-500">
                      <p className="text-sm font-semibold text-gray-900">Emergency Alert Nearby</p>
                      <p className="text-xs text-gray-600 mt-1">City Hospital needs O+ blood urgently</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                      <p className="text-sm font-semibold text-gray-900">Donation Camp</p>
                      <p className="text-xs text-gray-600 mt-1">Blood camp at Central Mall this weekend</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                      <p className="text-sm font-semibold text-gray-900">Impact Update</p>
                      <p className="text-xs text-gray-600 mt-1">Your blood donation saved 3 lives!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="p-2 text-gray-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              >
                <User className="w-6 h-6" />
              </button>

              {/* Profile Dropdown */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-200 rounded-xl shadow-lg p-6 z-50">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">Profile Information</h3>
                  <div className="space-y-3 bg-gradient-to-br from-rose-50 to-pink-50 p-4 rounded-lg">
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Full Name</p>
                      <p className="text-gray-900 font-semibold">{donor?.name}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Mobile Number</p>
                      <p className="text-gray-900 font-semibold">+91 {donor?.phone}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Email</p>
                      <p className="text-gray-900 font-semibold">{donor?.email || "Not provided"}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Blood Group</p>
                      <p className="text-gray-900 font-semibold text-lg">{donor?.bloodGroup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">Date of Birth</p>
                      <p className="text-gray-900 font-semibold">{donor?.dob}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold uppercase">City</p>
                      <p className="text-gray-900 font-semibold">{donor?.city}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="mt-4 w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 font-semibold py-2 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feature Buttons */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Donate Button */}
          <Link href="/donor/donate">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
                <div className="text-5xl mb-4">🩸</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">DONATE</h3>
                <p className="text-rose-100 text-sm">Find nearby hospitals and donate blood</p>
              </div>
            </div>
          </Link>

          {/* Emergency Button */}
          <Link href="/donor/emergency">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
                <div className="text-5xl mb-4">🚨</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">EMERGENCY</h3>
                <p className="text-red-100 text-sm">Send emergency alert to hospitals</p>
              </div>
            </div>
          </Link>

          {/* Track Button */}
          <Link href="/donor/track">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
                <div className="text-5xl mb-4">📊</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">
                  TRACK YOURSELF
                </h3>
                <p className="text-blue-100 text-sm">View your donation history</p>
              </div>
            </div>
          </Link>

          {/* Community Button */}
          <Link href="/donor/community">
            <div className="group cursor-pointer">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
                <div className="text-5xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold mb-2 group-hover:translate-y-1 transition-transform">
                  BUILD COMMUNITY
                </h3>
                <p className="text-purple-100 text-sm">Join our blood donor community</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-semibold">Total Donations</p>
            <p className="text-4xl font-bold text-rose-600 mt-2">3</p>
            <p className="text-gray-500 text-xs mt-2">You've saved approximately 9 lives</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-semibold">Last Donation</p>
            <p className="text-lg font-bold text-blue-600 mt-2">3 months ago</p>
            <p className="text-gray-500 text-xs mt-2">You're eligible to donate again</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <p className="text-gray-600 text-sm font-semibold">Blood Group</p>
            <p className="text-4xl font-bold text-green-600 mt-2">{donor?.bloodGroup}</p>
            <p className="text-gray-500 text-xs mt-2">High demand in India</p>
          </div>
        </div>
      </div>
    </div>
  )
}
