"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

interface BloodDonationCamp {
  id: number
  name: string
  date: string
  time: string
  location: string
  address: string
  distance: string
  expectedDonors: number
  registeredDonors: number
  organizerName: string
  phone: string
  image: string
}

interface DonationAchievement {
  title: string
  donors: number
  units: string
  date: string
  impact: string
}

const upcomingCamps: BloodDonationCamp[] = [
  {
    id: 1,
    name: "City Park Blood Camp",
    date: "December 15, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "City Park Main Ground",
    address: "123 Park Avenue, Mumbai",
    distance: "2.5 km away",
    expectedDonors: 100,
    registeredDonors: 45,
    organizerName: "Mumbai Red Cross",
    phone: "+91 9876543210",
    image: "/blood-donation-camp.jpg",
  },
  {
    id: 2,
    name: "Mall Community Drive",
    date: "December 20, 2025",
    time: "11:00 AM - 7:00 PM",
    location: "Central Shopping Mall - 3rd Floor",
    address: "456 Commercial Zone, Mumbai",
    distance: "3.2 km away",
    expectedDonors: 80,
    registeredDonors: 32,
    organizerName: "Life Blood Foundation",
    phone: "+91 9876543211",
    image: "/mall-blood-drive.jpg",
  },
  {
    id: 3,
    name: "Corporate Blood Bank",
    date: "December 25, 2025",
    time: "10:00 AM - 4:00 PM",
    location: "Tech Park Building - B",
    address: "789 Business District, Mumbai",
    distance: "4.1 km away",
    expectedDonors: 120,
    registeredDonors: 67,
    organizerName: "Tech Companies Alliance",
    phone: "+91 9876543212",
    image: "/corporate-blood-drive.jpg",
  },
  {
    id: 4,
    name: "University Blood Drive",
    date: "January 5, 2026",
    time: "1:00 PM - 6:00 PM",
    location: "University Sports Complex",
    address: "University Campus, Mumbai",
    distance: "5.8 km away",
    expectedDonors: 150,
    registeredDonors: 88,
    organizerName: "Student Welfare Committee",
    phone: "+91 9876543213",
    image: "/university-blood-camp.jpg",
  },
]

const achievements: DonationAchievement[] = [
  {
    title: "November Blood Drive Success",
    donors: 245,
    units: "1,225 units",
    date: "November 2025",
    impact: "Helped 500+ patients in need",
  },
  {
    title: "October Emergency Response",
    donors: 156,
    units: "780 units",
    date: "October 2025",
    impact: "Provided blood for 5 emergency cases",
  },
  {
    title: "September Community Campaign",
    donors: 312,
    units: "1,560 units",
    date: "September 2025",
    impact: "Supported 600+ surgical procedures",
  },
]

export default function CommunityPage() {
  const [registeredCamps, setRegisteredCamps] = useState<number[]>([])
  const [activeTab, setActiveTab] = useState<"camps" | "achievements" | "stories">("camps")

  const handleRegisterCamp = (campId: number) => {
    if (registeredCamps.includes(campId)) {
      setRegisteredCamps(registeredCamps.filter((id) => id !== campId))
      alert("Unregistered from camp")
    } else {
      setRegisteredCamps([...registeredCamps, campId])
      alert("Successfully registered for the camp!")
    }
  }

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
      <div className="bg-gradient-to-r from-rose-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Community & Donation Camps</h1>
          <p className="text-rose-100 text-lg">Join blood donation camps and save lives together</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("camps")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors ${
              activeTab === "camps"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Upcoming Camps
          </button>
          <button
            onClick={() => setActiveTab("achievements")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors ${
              activeTab === "achievements"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Community Achievements
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            className={`py-3 px-4 font-semibold border-b-2 transition-colors ${
              activeTab === "stories"
                ? "border-rose-600 text-rose-600"
                : "border-transparent text-gray-600 hover:text-gray-900"
            }`}
          >
            Success Stories
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Camps Tab */}
        {activeTab === "camps" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Blood Donation Camps</h2>
              <p className="text-gray-600">{upcomingCamps.length} camps available</p>
            </div>

            <div className="grid gap-6">
              {upcomingCamps.map((camp) => (
                <Card key={camp.id} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3 bg-gray-200 h-48 md:h-auto">
                      <img
                        src={camp.image || "/placeholder.svg"}
                        alt={camp.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{camp.name}</h3>
                          <p className="text-gray-600">{camp.address}</p>
                        </div>
                        <span className="bg-rose-100 text-rose-700 text-sm font-bold px-4 py-2 rounded-full">
                          {camp.distance}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 mb-4 border-y border-gray-200">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Date</p>
                          <p className="font-semibold text-gray-900">{camp.date}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Time</p>
                          <p className="font-semibold text-gray-900">{camp.time}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Registrations</p>
                          <p className="font-semibold text-gray-900">
                            {camp.registeredDonors}/{camp.expectedDonors}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Organizer</p>
                          <p className="font-semibold text-gray-900">{camp.organizerName}</p>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-6">
                        <div className="flex justify-between mb-2">
                          <p className="text-sm text-gray-600">Registration Progress</p>
                          <p className="text-sm font-semibold text-gray-900">
                            {Math.round((camp.registeredDonors / camp.expectedDonors) * 100)}%
                          </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-rose-600 h-2 rounded-full transition-all"
                            style={{
                              width: `${(camp.registeredDonors / camp.expectedDonors) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleRegisterCamp(camp.id)}
                          className={`flex-1 ${
                            registeredCamps.includes(camp.id)
                              ? "bg-gray-300 text-gray-700 hover:bg-gray-400"
                              : "bg-rose-600 hover:bg-rose-700 text-white"
                          }`}
                        >
                          {registeredCamps.includes(camp.id) ? "Unregister" : "Register Now"}
                        </Button>
                        <Button variant="outline" className="flex-1 bg-transparent">
                          Call: {camp.phone}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Community Achievements</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="border-0 shadow-md bg-gradient-to-br from-rose-50 to-pink-50">
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-2">Total Donations This Year</p>
                  <p className="text-4xl font-bold text-rose-600 mb-4">12,450 units</p>
                  <p className="text-gray-600 text-sm">Collected from 2,500+ donors</p>
                </div>
              </Card>

              <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-2">Lives Saved</p>
                  <p className="text-4xl font-bold text-blue-600 mb-4">5,000+</p>
                  <p className="text-gray-600 text-sm">Through blood transfusions</p>
                </div>
              </Card>

              <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-emerald-50">
                <div className="p-6">
                  <p className="text-sm text-gray-600 mb-2">Active Community Members</p>
                  <p className="text-4xl font-bold text-green-600 mb-4">3,200+</p>
                  <p className="text-gray-600 text-sm">Regular donors and supporters</p>
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              {achievements.map((achievement, idx) => (
                <Card key={idx} className="border-0 shadow-md">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{achievement.title}</h3>
                        <p className="text-gray-600 text-sm">{achievement.date}</p>
                      </div>
                      <span className="bg-rose-100 text-rose-700 font-bold px-4 py-2 rounded-lg">
                        {achievement.units}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-4 border-y border-gray-200 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Donors Participated</p>
                        <p className="font-semibold text-gray-900">{achievement.donors}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 mb-1">Community Impact</p>
                        <p className="font-semibold text-gray-900">{achievement.impact}</p>
                      </div>
                    </div>

                    <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">Learn More</Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Stories Tab */}
        {activeTab === "stories" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Success Stories</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((story) => (
                <Card key={story} className="border-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        S{story}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Story {story}: A Life Saved</h3>
                        <p className="text-sm text-gray-600">Shared by a grateful patient</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">
                      "Thanks to the BloodConnect platform and the generous donors, I received the blood I needed during
                      my emergency surgery. The entire process was smooth, and I got the right blood type within 2
                      hours. I'm forever grateful to all the donors and medical professionals."
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-gray-600">Donor: Anonymous</p>
                        <p className="text-xs text-gray-600">Blood Type: O+</p>
                      </div>
                      <Button variant="outline">Read Full Story</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
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
              <h4 className="font-semibold text-white mb-4">Community</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="hover:text-white">
                    Blood Camps
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Stories
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
