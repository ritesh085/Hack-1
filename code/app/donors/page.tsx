"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const BLOOD_TYPES = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

interface Donor {
  id: number
  name: string
  bloodType: string
  age: number
  location: string
  distance: string
  phone: string
  lastDonation: string
  canDonate: boolean
  beepActive: boolean
  sosActive: boolean
  experience: number
  rating: number
}

const donors: Donor[] = [
  {
    id: 1,
    name: "Raj Kumar",
    bloodType: "O+",
    age: 28,
    location: "Mumbai - South District",
    distance: "1.5 km",
    phone: "+91 9876543210",
    lastDonation: "2 months ago",
    canDonate: true,
    beepActive: true,
    sosActive: false,
    experience: 5,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Priya Singh",
    bloodType: "O+",
    age: 26,
    location: "Mumbai - Central Zone",
    distance: "2.1 km",
    phone: "+91 9876543211",
    lastDonation: "1 month ago",
    canDonate: true,
    beepActive: true,
    sosActive: true,
    experience: 3,
    rating: 4.6,
  },
  {
    id: 3,
    name: "Ahmed Ali",
    bloodType: "O-",
    age: 35,
    location: "Mumbai - North Zone",
    distance: "3.2 km",
    phone: "+91 9876543212",
    lastDonation: "2 months ago",
    canDonate: true,
    beepActive: false,
    sosActive: true,
    experience: 8,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Anjali Sharma",
    bloodType: "A+",
    age: 24,
    location: "Mumbai - East District",
    distance: "2.8 km",
    phone: "+91 9876543213",
    lastDonation: "45 days ago",
    canDonate: false,
    beepActive: true,
    sosActive: false,
    experience: 2,
    rating: 4.5,
  },
  {
    id: 5,
    name: "Vikram Patel",
    bloodType: "B+",
    age: 32,
    location: "Mumbai - South District",
    distance: "1.9 km",
    phone: "+91 9876543214",
    lastDonation: "3 months ago",
    canDonateNow: true,
    beepActive: true,
    sosActive: false,
    experience: 6,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Neha Gupta",
    bloodType: "AB+",
    age: 29,
    location: "Mumbai - West District",
    distance: "2.3 km",
    phone: "+91 9876543215",
    lastDonation: "1.5 months ago",
    canDonate: true,
    beepActive: false,
    sosActive: true,
    experience: 4,
    rating: 4.4,
  },
]

export default function DonorsPage() {
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null)
  const [availableOnly, setAvailableOnly] = useState(false)
  const [sosActive, setSosActive] = useState(false)
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [emergencyBloodType, setEmergencyBloodType] = useState("")

  const filteredDonors = donors.filter((donor) => {
    const matchesBlood = selectedBloodType === null || donor.bloodType === selectedBloodType
    const matchesAvailable = !availableOnly || donor.canDonate
    const matchesSos = !sosActive || donor.sosActive

    return matchesBlood && matchesAvailable && matchesSos
  })

  const handleEmergencyAlert = () => {
    if (!emergencyBloodType) {
      alert("Please select a blood type")
      return
    }
    setEmergencyMode(true)
    // Simulate sending alerts to donors
    setTimeout(() => {
      alert(
        `Emergency alert sent to ${Math.floor(Math.random() * 5) + 3} nearby donors with ${emergencyBloodType} blood type!`,
      )
    }, 500)
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center text-white font-bold">
              +
            </div>
            <span className="font-bold text-gray-900">BloodConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/hospital/dashboard">
              <Button variant="ghost" className="text-gray-700">
                Dashboard
              </Button>
            </Link>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Find Available Donors</h1>
          <p className="text-red-100 text-lg">Connect with verified blood donors in your area</p>
        </div>
      </div>

      {/* Emergency Alert Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-gradient-to-r from-red-500 to-rose-600 rounded-xl p-8 text-white mb-8">
          <h2 className="text-2xl font-bold mb-4">Emergency Blood Request</h2>
          <p className="mb-6">Send instant alerts to donors with required blood type</p>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Blood Type Required</label>
              <select
                value={emergencyBloodType}
                onChange={(e) => setEmergencyBloodType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <option value="">Select Blood Type</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Units Needed</label>
              <input
                type="number"
                placeholder="2"
                min="1"
                max="10"
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 border-0 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div className="flex items-end">
              <Button
                onClick={handleEmergencyAlert}
                className="w-full bg-white text-red-600 hover:bg-gray-100 font-bold py-3 rounded-lg"
              >
                Send Emergency Alert
              </Button>
            </div>
          </div>

          {emergencyMode && (
            <div className="bg-white bg-opacity-20 border border-white rounded-lg p-4">
              <p className="text-sm">Alert Status: Active - Sent to nearest donors</p>
              <p className="text-xs text-red-100 mt-2">
                Donors will receive notification and can respond within 5 minutes
              </p>
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Search Donors</h2>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Blood Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Blood Type</label>
              <select
                value={selectedBloodType || ""}
                onChange={(e) => setSelectedBloodType(e.target.value || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="">All Blood Types</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Available Donors */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={availableOnly}
                  onChange={(e) => setAvailableOnly(e.target.checked)}
                  className="w-4 h-4 text-red-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Can Donate Now</span>
              </label>
            </div>

            {/* SOS Active */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer w-full">
                <input
                  type="checkbox"
                  checked={sosActive}
                  onChange={(e) => setSosActive(e.target.checked)}
                  className="w-4 h-4 text-red-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">SOS Active Only</span>
              </label>
            </div>

            <div className="text-sm text-gray-600 flex items-end">Found {filteredDonors.length} donors</div>
          </div>
        </div>

        {/* Donors List */}
        <div className="space-y-6">
          {filteredDonors.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-lg">No donors found matching your criteria</p>
            </div>
          ) : (
            filteredDonors.map((donor) => (
              <Card key={donor.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{donor.name}</h3>
                          <p className="text-gray-600 text-sm">{donor.location}</p>
                        </div>
                      </div>

                      {/* Status Badges */}
                      <div className="flex gap-2 mt-2">
                        <span className="bg-red-100 text-red-700 text-sm font-bold px-3 py-1 rounded-full">
                          Blood: {donor.bloodType}
                        </span>
                        {donor.canDonate && (
                          <span className="bg-green-100 text-green-700 text-sm font-bold px-3 py-1 rounded-full">
                            Can Donate
                          </span>
                        )}
                        {donor.beepActive && (
                          <span className="bg-blue-100 text-blue-700 text-sm font-bold px-3 py-1 rounded-full">
                            Beep Active
                          </span>
                        )}
                        {donor.sosActive && (
                          <span className="bg-orange-100 text-orange-700 text-sm font-bold px-3 py-1 rounded-full">
                            SOS Active
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Rating and Distance */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-yellow-500">{donor.rating}</div>
                      <p className="text-sm text-gray-600 font-semibold">{donor.distance}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid md:grid-cols-4 gap-4 mb-6 py-4 border-y border-gray-200">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Age</p>
                      <p className="font-semibold text-gray-900">{donor.age} years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Last Donation</p>
                      <p className="font-semibold text-gray-900">{donor.lastDonation}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Experience</p>
                      <p className="font-semibold text-gray-900">{donor.experience} donations</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Phone</p>
                      <p className="font-semibold text-gray-900">{donor.phone}</p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white">Request Blood</Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">Send Alert</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Call Donor
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-red-600 rounded-lg"></div>
                <span className="font-bold text-white">BloodConnect</span>
              </div>
              <p className="text-sm">Saving lives through smart connections</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/hospitals" className="hover:text-white">
                    Hospitals
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Emergency Hotline
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2025 BloodConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
