"use client"

import Link from "next/link"
import { ArrowLeft, Heart, Hand } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50">
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

      {/* Coming Soon Section */}
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-2xl w-full text-center">
          {/* Animated Elements */}
          <div className="relative h-64 mb-8 flex items-center justify-center">
            {/* Floating Hearts */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-24 h-24 text-rose-500 animate-bounce" style={{ animationDelay: "0s" }} />
              <Hand className="w-20 h-20 text-rose-400 absolute animate-pulse" style={{ animationDelay: "0.5s" }} />
            </div>

            {/* Decorative circles */}
            <div
              className="absolute w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="absolute w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
            <div
              className="absolute w-72 h-72 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"
              style={{ animationDelay: "4s" }}
            ></div>
          </div>

          {/* Content */}
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4 animate-pulse">
            Coming Soon
          </h1>

          <p className="text-2xl text-gray-700 font-semibold mb-4">Build Our Blood Donor Community</p>

          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            We're building something special to connect blood donors, share stories, celebrate achievements, and create
            a vibrant community of life-savers.
          </p>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-purple-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🎉</div>
              <p className="font-semibold text-gray-900">Donor Achievements</p>
              <p className="text-sm text-gray-600 mt-2">Celebrate milestones and earn badges</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-pink-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📖</div>
              <p className="font-semibold text-gray-900">Share Stories</p>
              <p className="text-sm text-gray-600 mt-2">Inspire others with your donation journey</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-rose-200 hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">👥</div>
              <p className="font-semibold text-gray-900">Connect & Network</p>
              <p className="text-sm text-gray-600 mt-2">Meet like-minded blood donors</p>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="bg-gradient-to-r from-purple-500 to-rose-500 rounded-2xl p-8 text-white mb-8">
            <h2 className="text-2xl font-bold mb-4">Be the First to Know</h2>
            <p className="mb-6 text-purple-100">Get notified when our community launches</p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
              <Button className="bg-white text-rose-600 hover:bg-purple-50 font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
                Notify Me
              </Button>
            </div>
          </div>

          {/* Countdown */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-gray-600 font-semibold mb-3">Launching in</p>
            <div className="grid grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-600">45</p>
                <p className="text-xs text-gray-600 uppercase font-semibold">Days</p>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-pink-600">12</p>
                <p className="text-xs text-gray-600 uppercase font-semibold">Hours</p>
              </div>
              <div className="bg-gradient-to-br from-rose-100 to-rose-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-rose-600">30</p>
                <p className="text-xs text-gray-600 uppercase font-semibold">Minutes</p>
              </div>
              <div className="bg-gradient-to-br from-red-100 to-red-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-red-600">58</p>
                <p className="text-xs text-gray-600 uppercase font-semibold">Seconds</p>
              </div>
            </div>
          </div>

          {/* Follow Social */}
          <div className="mt-8">
            <p className="text-gray-600 font-semibold mb-4">Follow us for updates</p>
            <div className="flex gap-4 justify-center">
              <button className="w-12 h-12 rounded-full bg-blue-500 text-white hover:scale-110 transition-transform flex items-center justify-center text-xl">
                f
              </button>
              <button className="w-12 h-12 rounded-full bg-sky-500 text-white hover:scale-110 transition-transform flex items-center justify-center text-xl">
                𝕏
              </button>
              <button className="w-12 h-12 rounded-full bg-purple-500 text-white hover:scale-110 transition-transform flex items-center justify-center text-xl">
                📷
              </button>
              <button className="w-12 h-12 rounded-full bg-red-500 text-white hover:scale-110 transition-transform flex items-center justify-center text-xl">
                ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
