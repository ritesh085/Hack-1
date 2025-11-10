"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
              +
            </div>
            <span className="font-bold text-gray-900">BloodConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/profile">
              <Button variant="ghost" className="text-gray-700">
                Profile
              </Button>
            </Link>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome to Your Dashboard</h1>
          <p className="text-gray-600">Complete your profile to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">👤</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Profile</h3>
            <p className="text-gray-600 text-sm">Add your personal information and blood type</p>
            <Link href="/dashboard/setup-profile">
              <Button className="mt-4 bg-rose-600 hover:bg-rose-700 text-white w-full">Get Started</Button>
            </Link>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-4">🏥</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">View Hospitals</h3>
            <p className="text-gray-600 text-sm">Find nearby hospitals and blood banks</p>
            <Button className="mt-4 bg-gray-200 hover:bg-gray-300 text-gray-900 w-full" disabled>
              Coming Soon
            </Button>
          </Card>
        </div>
      </div>
    </main>
  )
}
