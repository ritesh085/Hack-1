"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

const BLOOD_TYPES = ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"]

interface Hospital {
  id: number
  name: string
  address: string
  city: string
  distance: string
  phone: string
  email: string
  totalBeds: number
  emergencyBeds: number
  bloodInventory: Record<string, number>
  departments: string[]
  operatingHours: string
  emergencyServices: boolean
  rating: number
  reviews: number
}

const hospitals: Hospital[] = [
  {
    id: 1,
    name: "City Medical Hospital",
    address: "123 Medical Complex, Healthcare St",
    city: "Mumbai",
    distance: "2.5 km",
    phone: "+91 9876543210",
    email: "contact@cityhospital.com",
    totalBeds: 250,
    emergencyBeds: 35,
    bloodInventory: { "O+": 12, "O-": 4, "A+": 8, "A-": 2, "B+": 6, "B-": 1, "AB+": 3, "AB-": 0 },
    departments: ["Emergency", "ICU", "General Ward", "OPD"],
    operatingHours: "24/7",
    emergencyServices: true,
    rating: 4.5,
    reviews: 248,
  },
  {
    id: 2,
    name: "Central Medical Center",
    address: "456 Park Avenue",
    city: "Mumbai",
    distance: "3.8 km",
    phone: "+91 9876543211",
    email: "contact@centralmedical.com",
    totalBeds: 180,
    emergencyBeds: 28,
    bloodInventory: { "O+": 15, "O-": 6, "A+": 10, "A-": 3, "B+": 8, "B-": 2, "AB+": 5, "AB-": 1 },
    departments: ["Emergency", "Trauma Center", "ICU", "Blood Bank"],
    operatingHours: "24/7",
    emergencyServices: true,
    rating: 4.7,
    reviews: 312,
  },
  {
    id: 3,
    name: "Health Care Plus",
    address: "789 Oak Road, Medical Zone",
    city: "Mumbai",
    distance: "5.2 km",
    phone: "+91 9876543212",
    email: "contact@healthcareplus.com",
    totalBeds: 320,
    emergencyBeds: 45,
    bloodInventory: { "O+": 20, "O-": 8, "A+": 14, "A-": 5, "B+": 11, "B-": 3, "AB+": 7, "AB-": 2 },
    departments: ["Emergency", "ICU", "General Ward", "Trauma Center", "OPD"],
    operatingHours: "24/7",
    emergencyServices: true,
    rating: 4.6,
    reviews: 425,
  },
  {
    id: 4,
    name: "Sunrise General Hospital",
    address: "321 Sunrise Plaza",
    city: "Mumbai",
    distance: "6.1 km",
    phone: "+91 9876543213",
    email: "contact@sunrisehospital.com",
    totalBeds: 150,
    emergencyBeds: 20,
    bloodInventory: { "O+": 10, "O-": 3, "A+": 6, "A-": 1, "B+": 5, "B-": 1, "AB+": 2, "AB-": 0 },
    departments: ["General Ward", "OPD", "Blood Bank"],
    operatingHours: "6 AM - 10 PM",
    emergencyServices: false,
    rating: 4.2,
    reviews: 156,
  },
]

export default function HospitalsPage() {
  const [selectedBloodType, setSelectedBloodType] = useState<string | null>(null)
  const [searchCity, setSearchCity] = useState("")
  const [emergencyOnly, setEmergencyOnly] = useState(false)

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesCity = searchCity === "" || hospital.city.toLowerCase().includes(searchCity.toLowerCase())
    const matchesEmergency = !emergencyOnly || hospital.emergencyServices
    const matchesBlood =
      selectedBloodType === null ||
      (hospital.bloodInventory[selectedBloodType as keyof typeof hospital.bloodInventory] || 0) > 0

    return matchesCity && matchesEmergency && matchesBlood
  })

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold">
              +
            </div>
            <span className="font-bold text-gray-900">BloodConnect</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/donor/dashboard">
              <Button variant="ghost" className="text-gray-700">
                Dashboard
              </Button>
            </Link>
            <Button className="bg-rose-600 hover:bg-rose-700 text-white">Logout</Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Find Hospitals Near You</h1>
          <p className="text-blue-100 text-lg">Search and connect with verified hospitals and blood banks</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Filter Hospitals</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {/* City Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Search City</label>
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Enter city name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Blood Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Blood Type Available</label>
              <select
                value={selectedBloodType || ""}
                onChange={(e) => setSelectedBloodType(e.target.value || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Blood Types</option>
                {BLOOD_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Filter */}
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emergencyOnly}
                  onChange={(e) => setEmergencyOnly(e.target.checked)}
                  className="w-4 h-4 text-blue-500 rounded"
                />
                <span className="text-sm font-semibold text-gray-900">Emergency Services Only</span>
              </label>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-4">Found {filteredHospitals.length} hospitals</p>
        </div>

        {/* Hospital List */}
        <div className="space-y-6">
          {filteredHospitals.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-lg">No hospitals found matching your criteria</p>
            </div>
          ) : (
            filteredHospitals.map((hospital) => (
              <Card key={hospital.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  {/* Header Row */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-gray-900">{hospital.name}</h3>
                        {hospital.emergencyServices && (
                          <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">
                            24/7 Emergency
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{hospital.address}</p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📍 {hospital.distance}</span>
                        <span>📞 {hospital.phone}</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-500">{hospital.rating}</div>
                      <p className="text-sm text-gray-600">{hospital.reviews} reviews</p>
                    </div>
                  </div>

                  {/* Content Grid */}
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    {/* Facilities */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Facilities</h4>
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-700">
                          <span className="font-semibold">Total Beds:</span> {hospital.totalBeds}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Emergency Beds:</span> {hospital.emergencyBeds}
                        </p>
                        <p className="text-gray-700">
                          <span className="font-semibold">Hours:</span> {hospital.operatingHours}
                        </p>
                      </div>
                    </div>

                    {/* Departments */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Departments</h4>
                      <div className="flex flex-wrap gap-2">
                        {hospital.departments.slice(0, 3).map((dept) => (
                          <span key={dept} className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                            {dept}
                          </span>
                        ))}
                        {hospital.departments.length > 3 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                            +{hospital.departments.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Blood Inventory */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Available Blood</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {Object.entries(hospital.bloodInventory).map(([type, amount]) => (
                          <div
                            key={type}
                            className={`px-2 py-1 rounded ${
                              amount > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 line-through"
                            }`}
                          >
                            {type}: {amount}L
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">View Details</Button>
                    <Button className="flex-1 bg-rose-500 hover:bg-rose-600 text-white">Request Blood</Button>
                    <Button variant="outline" className="flex-1 bg-transparent">
                      Call Hospital
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
                <div className="w-8 h-8 bg-rose-500 rounded-lg"></div>
                <span className="font-bold text-white">BloodConnect</span>
              </div>
              <p className="text-sm">Saving lives through smart connections</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Hospitals
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Donors
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact
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
