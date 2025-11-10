"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { InfoModal } from "@/components/info-modal"
import { useState } from "react"

export default function LandingPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const modalData = {
    guidelines: {
      title: "Blood Donation Guidelines & Eligibility",
      content: `India's National Blood Transfusion Council Guidelines for Blood Donation:

ELIGIBILITY CRITERIA FOR DONORS IN INDIA:
• Age: 18-60 years (First-time donors: 18-45 years)
• Weight: Minimum 45 kg (100 lbs)
• Hemoglobin Level: Minimum 12.5 g/dL for females, 13.5 g/dL for males
• Blood Pressure: Systolic 90-180 mmHg, Diastolic 50-100 mmHg
• Pulse Rate: 60-100 beats per minute

TEMPORARY DEFERRALS (Follow-up donation possible):
• Fever or Flu: Wait 2 weeks after recovery
• Vaccination: Wait 2 weeks after vaccination
• Minor Surgery: Wait 6 months
• Dental Work: Wait 24 hours
• Blood Test: Wait 1 month

PERMANENT DEFERRALS:
• Confirmed cases of HIV, Hepatitis B/C, or Syphilis
• Chronic conditions like uncontrolled diabetes or hypertension
• Recent travel to malaria endemic areas (3 months)
• Pregnancy and breast-feeding (6 months post-delivery)

REQUIRED DOCUMENTATION IN INDIAN BLOOD BANKS:
• Valid ID (Aadhaar, PAN, Driving License, Passport)
• Proof of Address
• Health Screening Questionnaire (filled completely)
• Informed Consent Form (signed)

MEDICAL SCREENING PROCESS:
1. Registration and personal health history
2. Blood pressure and temperature check
3. Hemoglobin testing (using HemoCue method)
4. Blood typing and cross-matching
5. Disease screening (HIV, HCV, HBsAg, RPR)

BENEFITS PROVIDED BY INDIAN HOSPITALS:
• Free blood test results
• Health checkup report
• Light refreshments and snacks post-donation
• Donation card or certificate`,
    },
    benefits: {
      title: "Health Benefits of Blood Donation",
      content: `Scientific Proven Health Benefits of Regular Blood Donation in India:

CARDIOVASCULAR BENEFITS:
• Reduces risk of heart disease by 88% according to AIIMS studies
• Lowers blood pressure and cholesterol levels
• Improves blood circulation and oxygen flow
• Reduces iron overload related heart problems
• Strengthens heart muscle function

METABOLIC HEALTH IMPROVEMENTS:
• Reduces insulin resistance and type 2 diabetes risk
• Improves glucose metabolism
• Reduces body fat composition
• Helps maintain healthy body weight
• Improves overall metabolic rate

BLOOD & OXYGEN BENEFITS:
• Stimulates production of fresh red blood cells
• Increases oxygen-carrying capacity of blood
• Reduces viscosity of blood for better flow
• Boosts hemoglobin production naturally
• Rejuvenates bone marrow activity

CANCER PREVENTION:
• Reduces cancer risk by up to 48% (Harvard study)
• Lower iron levels linked to reduced cancer risk
• Particularly effective for liver, lung, and colorectal cancers
• Strengthens immune system against malignant cells

PSYCHOLOGICAL BENEFITS:
• Provides sense of purpose and community service
• Reduces stress and anxiety levels
• Boosts mental health and well-being
• Creates positive social connection
• Improves life satisfaction

POST-DONATION CARE IN INDIA:
• Stay hydrated - drink 1.5-2 liters of water daily for 48 hours
• Rest for 2-3 hours after donation
• Avoid heavy exercise for 24 hours
• Eat iron-rich foods (spinach, leafy vegetables, red meat)
• Avoid alcohol for 24 hours
• Keep donation site clean and dry

INDIAN HOSPITALS PROVIDING THESE BENEFITS:
• Free health checkup with each donation
• Nutritional counseling services
• Regular health newsletters
• Membership in blood donor clubs with benefits
• Emergency blood assistance for family members`,
    },
    firstaid: {
      title: "First Aid for Severe Bleeding - Indian Standards",
      content: `WHO and Indian Medical Association Guidelines for Managing Severe Bleeding:

IMMEDIATE RESPONSE (First 3 Minutes):
1. Ensure your safety - Wear gloves if available
2. Call emergency services: 102 (Ambulance in India)
3. Position patient lying down with legs elevated (unless head injury)
4. Keep patient warm using blankets
5. Do not panic - Stay calm to reassure patient

DIRECT PRESSURE TECHNIQUE:
• Apply direct pressure immediately with clean cloth or sterile gauze
• Use bare hands if cloth not available (squeeze firmly)
• Apply continuous pressure for 10-15 minutes
• Do not remove first cloth - layer new cloth if bleeding continues
• Press on the wound edges, not on the wound itself

TOURNIQUET APPLICATION (For Limb Bleeding):
• Apply 2 inches above the wound, never directly on wound
• Use wide cloth/belt (2+ inches wide)
• Tighten until bleeding stops and pulse below tourniquet disappears
• Write time of application on tourniquet
• Maximum application time: 2 hours (Indian Red Cross Guidelines)

PRESSURE POINTS (If Direct Pressure Fails):
• Arm: Apply pressure at inner side near elbow
• Leg: Apply pressure at groin area
• Neck: Use gentle pressure avoiding carotid artery
• Head: Use pad under pressure point for skull wounds

ELEVATION TECHNIQUE:
• Raise injured limb above heart level (if no fracture suspected)
• Supports gravity to reduce blood flow
• Combine with direct pressure for best results
• Keep limb immobilized

WHAT NOT TO DO:
• Do NOT remove embedded objects
• Do NOT probe the wound
• Do NOT apply tourniquet around chest
• Do NOT stop applying pressure before 10 minutes
• Do NOT apply ice directly to wound

TRANSPORT TO HOSPITAL:
• Contact nearest emergency hospital immediately
• Major hospitals in India with trauma centers listed
• Keep patient calm and still during transport
• Maintain pressure during transport
• Inform paramedics about tourniquet application time

INDIAN HOSPITALS WITH 24/7 TRAUMA CENTERS:
• All government medical colleges have trauma centers
• Major private chains: Apollo, Fortis, Max, Manipal
• Emergency hotline: 102 (Ambulance), 108 (Arogya Raksha)
• Average response time in metros: 10-15 minutes`,
    },
    blooddonorday: {
      title: "World Blood Donor Day - June 14",
      content: `Understanding World Blood Donor Day and Blood Donation Impact in India:

HISTORY & SIGNIFICANCE:
• Celebrated every June 14th (Birthday of Karl Landsteiner, blood group discoverer)
• Started in 2004 by WHO to raise awareness about blood safety
• Theme 2024-2025: "20 Years of Celebrating Giving"
• India is the world's second-largest blood collection country

BLOOD DONATION STATISTICS IN INDIA:
• Over 90 lakh units collected annually
• Blood collection rate: 6.1 units per 1000 population
• Requirement: 7-8 units per 1000 population (target not yet met)
• Voluntary donation rate: 60% (increasing trend)
• Only 35-40% Indians are aware of blood donation importance

NATIONAL BLOOD TRANSFUSION COUNCIL INITIATIVES:
• Registered Blood Banks: 2,393 across India
• Mobile Blood Collection Units: Growing network
• Blood Component Therapy Centers: 350+
• Plasma Fractionation Centers: 23
• Cord Blood Banks: Emerging sector

MAJOR BLOOD DONOR ORGANIZATIONS IN INDIA:
• Indian Red Cross Society
• Blood Donors Association of India (BDA)
• State Blood Transfusion Councils
• NGOs: Aadhaar Foundation, Sound Health Foundation
• Hospital-based blood banks in metros and tier-2 cities

WHY BLOOD DONATION IS CRITICAL IN INDIA:
• Thalassemia patients: 200,000+ requiring regular transfusions
• Accident/trauma cases: 5-10 lakh annually
• Cancer treatment: 5,000+ units needed daily
• Childbirth complications: Major cause of blood need
• Surgery and organ transplants: Critical requirement

GOVERNMENT INITIATIVES FOR WORLD BLOOD DONOR DAY:
• National Campaign by Ministry of Health
• Blood Donation Camps in schools, colleges, offices
• Media awareness through TV, radio, social media
• Awards and recognition for blood donors
• Certificate distribution for regular donors

HOW YOU CAN PARTICIPATE IN INDIA:
• Donate blood at government or private blood banks
• Participate in organized blood camps in your area
• Encourage family and friends to donate
• Spread awareness on social media
• Join blood donor associations in your locality

INDIAN HOSPITALS ORGANIZING BLOOD DONOR DAY CAMPS:
• Free blood testing camps
• Health screening for all donors
• Special recognition for regular donors
• Community gatherings and awareness sessions
• Blood donation certificates and acknowledgments`,
    },
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            +
          </div>
          <span className="text-xl font-bold text-gray-900">
            Blood<span className="text-rose-500">Connect</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#" className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200">
            About Us
          </Link>
          <Link href="#" className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200">
            Donor Stories
          </Link>
          <Link href="#" className="text-gray-700 hover:text-rose-500 font-medium transition-colors duration-200">
            Contact Us
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-12 px-6 md:px-12 py-20 md:py-32 items-center">
        {/* Left Side - Main Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Save Lives Through
            <br />
            <span className="text-rose-500">Smart Blood</span> Connection
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Connect hospitals to verified donors instantly. Track blood inventory in real-time and respond to
            emergencies within minutes.
          </p>

          <div className="flex gap-4 pt-4">
            <Link href="/hospital/login">
              <Button className="bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full px-8 py-3 h-auto text-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Medical Representative
              </Button>
            </Link>
            <Link href="/donor/login">
              <Button className="border-2 border-rose-500 text-rose-500 hover:bg-rose-50 rounded-full px-8 py-3 h-auto text-lg font-semibold bg-transparent transition-all duration-300 transform hover:scale-105 active:scale-95">
                Individual User
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Side - Image Cards as Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {/* Guidelines Card */}
          <button
            onClick={() => setActiveModal("guidelines")}
            className="relative h-48 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-alrihj97rJf8v4dLe0lpO6XCkpSLyJ.jpg"
              alt="Blood Donation Guidelines"
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
              <span className="text-white font-bold text-sm">Blood Donation Guidelines</span>
            </div>
          </button>

          {/* Benefits Card */}
          <button
            onClick={() => setActiveModal("benefits")}
            className="relative h-48 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-DHLkLiWfBX8UoXrjAKgMAMjOzGuyFL.jpg"
              alt="Benefits of Blood Donation"
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
              <span className="text-white font-bold text-sm">Benefits of Blood Donation</span>
            </div>
          </button>

          {/* First Aid Card */}
          <button
            onClick={() => setActiveModal("firstaid")}
            className="relative h-48 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-XfrsjPEradPDOXgojUEMqCbjIFDubn.jpeg"
              alt="First Aid for Severe Bleeding"
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
              <span className="text-white font-bold text-sm">First Aid for Severe Bleeding</span>
            </div>
          </button>

          {/* World Blood Donor Day Card */}
          <button
            onClick={() => setActiveModal("blooddonorday")}
            className="relative h-48 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-2xl cursor-pointer group"
          >
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-Kr2CEhtv8kgPbWkGgMMNjjn8qxyj5v.jpeg"
              alt="World Blood Donor Day"
              className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-end p-4">
              <span className="text-white font-bold text-sm">World Blood Donor Day</span>
            </div>
          </button>
        </div>
      </div>

      {/* Support Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 md:px-12 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Support Patients & Donors</h2>
          <p className="text-xl leading-relaxed">
            Our platform connects patients with medical guidance, diagnostics, and encourages safe blood donation to
            save lives.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="px-6 md:px-12 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            title="Real-time Inventory"
            description="Track blood stock across hospitals with instant updates and low-stock alerts"
            icon="📊"
          />
          <FeatureCard
            title="Donor Network"
            description="Connect with verified donors nearby and schedule donations based on blood type needs"
            icon="👥"
          />
          <FeatureCard
            title="Emergency Response"
            description="Quick SOS alerts to activate the nearest donors in critical situations"
            icon="🚨"
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 md:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-rose-500 rounded-lg"></div>
              <span className="font-bold text-white">BloodConnect</span>
            </div>
            <p className="text-sm">Saving lives through smart connections</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Pricing
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
                  Blog
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
      </footer>

      {/* Modals */}
      <InfoModal
        isOpen={activeModal === "guidelines"}
        onClose={() => setActiveModal(null)}
        title={modalData.guidelines.title}
        content={modalData.guidelines.content}
        image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img1-alrihj97rJf8v4dLe0lpO6XCkpSLyJ.jpg"
      />
      <InfoModal
        isOpen={activeModal === "benefits"}
        onClose={() => setActiveModal(null)}
        title={modalData.benefits.title}
        content={modalData.benefits.content}
        image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img2-DHLkLiWfBX8UoXrjAKgMAMjOzGuyFL.jpg"
      />
      <InfoModal
        isOpen={activeModal === "firstaid"}
        onClose={() => setActiveModal(null)}
        title={modalData.firstaid.title}
        content={modalData.firstaid.content}
        image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img3-XfrsjPEradPDOXgojUEMqCbjIFDubn.jpeg"
      />
      <InfoModal
        isOpen={activeModal === "blooddonorday"}
        onClose={() => setActiveModal(null)}
        title={modalData.blooddonorday.title}
        content={modalData.blooddonorday.content}
        image="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img4-Kr2CEhtv8kgPbWkGgMMNjjn8qxyj5v.jpeg"
      />
    </main>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-shadow">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
