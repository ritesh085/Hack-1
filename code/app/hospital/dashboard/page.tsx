"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HospitalDashboard() {
  const [hospital, setHospital] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<"inventory" | "hospitals" | "donors">("inventory")

  useEffect(() => {
    const data = localStorage.getItem("hospitalData")
    if (data) {
      setHospital(JSON.parse(data))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome to {hospital?.hospitalName}</h1>
            <p className="text-gray-600 mt-1">Manage your blood inventory and requests</p>
          </div>
          <Link href="/">
            <Button variant="outline">Logout</Button>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-8">
            {(["inventory", "hospitals", "donors"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-2 font-semibold border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "inventory" ? "Update Inventory" : tab === "hospitals" ? "Nearby Hospitals" : "Find Donors"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {activeTab === "inventory" && <InventoryTab />}
        {activeTab === "hospitals" && <HospitalsTab />}
        {activeTab === "donors" && <DonorsTab />}
      </div>
    </div>
  )
}

function InventoryTab() {
  const [inventory, setInventory] = useState({
    "O+": 10,
    "O-": 5,
    "A+": 8,
    "A-": 3,
    "B+": 7,
    "B-": 2,
    "AB+": 4,
    "AB-": 1,
  })
  const [oxygenCylinders, setOxygenCylinders] = useState(25)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Blood Inventory</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
            {Object.entries(inventory).map(([type, amount]) => (
              <div key={type} className="border border-gray-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">{type}</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setInventory({ ...inventory, [type]: Number.parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Litres"
                />
                <p className="text-xs text-gray-600 mt-2">{amount} Litres</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Oxygen Cylinders</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Available Cylinders</label>
              <input
                type="number"
                value={oxygenCylinders}
                onChange={(e) => setOxygenCylinders(Number.parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white mt-6">Save Changes</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function HospitalsTab() {
  const nearbyHospitals = [
    {
      name: "City Hospital",
      distance: "2.5 km",
      bloodData: { "O+": 12, "O-": 4, "A+": 8, "A-": 2, "B+": 6, "B-": 1, "AB+": 3, "AB-": 0 },
    },
    {
      name: "Central Medical Center",
      distance: "3.8 km",
      bloodData: { "O+": 15, "O-": 6, "A+": 10, "A-": 3, "B+": 8, "B-": 2, "AB+": 5, "AB-": 1 },
    },
  ]

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Nearby Hospital Inventory</h2>
      {nearbyHospitals.map((hospital, idx) => (
        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">{hospital.name}</h3>
          <p className="text-gray-600 mb-4">Distance: {hospital.distance}</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 px-2 font-semibold">O+</th>
                  <th className="text-left py-2 px-2 font-semibold">O-</th>
                  <th className="text-left py-2 px-2 font-semibold">A+</th>
                  <th className="text-left py-2 px-2 font-semibold">A-</th>
                  <th className="text-left py-2 px-2 font-semibold">B+</th>
                  <th className="text-left py-2 px-2 font-semibold">B-</th>
                  <th className="text-left py-2 px-2 font-semibold">AB+</th>
                  <th className="text-left py-2 px-2 font-semibold">AB-</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  {Object.values(hospital.bloodData).map((amount: any, i) => (
                    <td key={i} className="py-2 px-2 text-gray-900">
                      {amount} L
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white">Request Blood</Button>
        </div>
      ))}
    </div>
  )
}

function DonorsTab() {
  const [selectedBloodType, setSelectedBloodType] = useState("O+")

  const donors = {
    "O+": [
      {
        name: "Raj Kumar",
        distance: "1.5 km",
        phone: "+91 9876543210",
        lastDonation: "2 months ago",
        beep: false,
        sos: false,
      },
      {
        name: "Priya Singh",
        distance: "2.1 km",
        phone: "+91 9876543211",
        lastDonation: "1 month ago",
        beep: false,
        sos: false,
      },
    ],
    "O-": [
      {
        name: "Ahmed Ali",
        distance: "3.2 km",
        phone: "+91 9876543212",
        lastDonation: "2 months ago",
        beep: false,
        sos: false,
      },
    ],
  }

  const currentDonors = (donors as any)[selectedBloodType] || []

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Select Blood Type</label>
        <select
          value={selectedBloodType}
          onChange={(e) => setSelectedBloodType(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Distance</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Last Donation</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Beep</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SOS</th>
            </tr>
          </thead>
          <tbody>
            {currentDonors.map((donor: any, idx: number) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-900 font-medium">{donor.name}</td>
                <td className="px-6 py-4 text-gray-600">{donor.distance}</td>
                <td className="px-6 py-4 text-gray-600">{donor.phone}</td>
                <td className="px-6 py-4 text-gray-600">{donor.lastDonation}</td>
                <td className="px-6 py-4">
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                    {donor.beep ? "✓" : "✕"} Beep
                  </Button>
                </td>
                <td className="px-6 py-4">
                  <Button variant="outline" className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent">
                    {donor.sos ? "✓" : "✕"} SOS
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
