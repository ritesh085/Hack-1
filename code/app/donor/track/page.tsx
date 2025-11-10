"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react"

export default function TrackPage() {
  const donations = [
    {
      id: 1,
      hospital: "City Hospital",
      date: "September 15, 2025",
      status: "accepted",
      amount: "450 ml",
      bloodType: "O+",
    },
    {
      id: 2,
      hospital: "Central Medical Center",
      date: "June 20, 2025",
      status: "accepted",
      amount: "450 ml",
      bloodType: "O+",
    },
    {
      id: 3,
      hospital: "Health Care Plus",
      date: "March 10, 2025",
      status: "rejected",
      amount: "450 ml",
      bloodType: "O+",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
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
        {/* Title Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Your Donation Journey</h1>
          <p className="text-gray-600 text-lg">Track your impact and see the lives you've helped save</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-rose-50 rounded-xl p-6 border border-rose-200">
            <p className="text-gray-600 text-sm font-semibold mb-2">Total Donations</p>
            <p className="text-4xl font-bold text-rose-600">3</p>
            <p className="text-gray-500 text-xs mt-2">~9 lives saved</p>
          </div>

          <div className="bg-green-50 rounded-xl p-6 border border-green-200">
            <p className="text-gray-600 text-sm font-semibold mb-2">Successful</p>
            <p className="text-4xl font-bold text-green-600">2</p>
            <p className="text-gray-500 text-xs mt-2">900 ml donated</p>
          </div>

          <div className="bg-red-50 rounded-xl p-6 border border-red-200">
            <p className="text-gray-600 text-sm font-semibold mb-2">Not Accepted</p>
            <p className="text-4xl font-bold text-red-600">1</p>
            <p className="text-gray-500 text-xs mt-2">Health criteria</p>
          </div>
        </div>

        {/* Donation History */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Donation History</h2>
          <div className="space-y-4">
            {donations.map((donation, index) => (
              <div
                key={donation.id}
                className={`rounded-xl border-2 p-6 transition-all duration-300 ${
                  donation.status === "accepted" ? "bg-green-50 border-green-300" : "bg-red-50 border-red-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">{donation.hospital}</h3>
                      {donation.status === "accepted" ? (
                        <span className="flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          <CheckCircle className="w-4 h-4" />
                          Accepted
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                          <XCircle className="w-4 h-4" />
                          Rejected
                        </span>
                      )}
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Date</p>
                        <p className="text-gray-900 font-semibold">{donation.date}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Blood Type</p>
                        <p className="text-lg font-bold text-gray-900">{donation.bloodType}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Amount</p>
                        <p className="text-gray-900 font-semibold">{donation.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold uppercase">Donation</p>
                        <p className="text-gray-900 font-semibold">#{index + 1}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
