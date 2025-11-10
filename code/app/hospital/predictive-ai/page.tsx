"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Bell, User } from "lucide-react"

export default function PredictiveAIPage() {
  const [hospital, setHospital] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("hospitalData")
    if (data) {
      setHospital(JSON.parse(data))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex flex-col">
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

      {/* Coming Soon Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-md">
          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div
                className="absolute inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-30 animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div className="absolute inset-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <span className="text-5xl">🤖</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
            Predictive AI
          </h1>

          <p className="text-gray-600 text-lg mb-4">Smart blood inventory predictions powered by AI</p>

          <p className="text-gray-500 text-sm mb-8">
            Our advanced AI system will predict blood demand patterns, optimize inventory management, and help prevent
            shortages. Coming soon!
          </p>

          {/* Floating Animation */}
          <div className="space-y-4">
            <div
              className="flex items-center justify-center gap-2 text-purple-600 animate-bounce"
              style={{ animationDelay: "0s" }}
            >
              <span className="text-xl">✨</span>
              <span className="font-semibold">Real-time predictions</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 text-pink-600 animate-bounce"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-xl">📊</span>
              <span className="font-semibold">Demand forecasting</span>
            </div>
            <div
              className="flex items-center justify-center gap-2 text-blue-600 animate-bounce"
              style={{ animationDelay: "0.4s" }}
            >
              <span className="text-xl">🎯</span>
              <span className="font-semibold">Optimization suggestions</span>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-100">
            <p className="text-sm text-gray-600 mb-4">Get notified when AI features launch</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 border-2 border-purple-200 rounded-lg focus:border-purple-500 focus:outline-none"
              />
              <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 active:scale-95 transition-all">
                Notify Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
