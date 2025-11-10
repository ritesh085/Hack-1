"use client"
import { X } from "lucide-react"

interface InfoModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  content: string
  image: string
}

export function InfoModal({ isOpen, onClose, title, content, image }: InfoModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animation-fade-in">
        <div className="sticky top-0 bg-rose-500 text-white p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">{title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-rose-600 rounded-lg transition-colors duration-200">
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <img src={image || "/placeholder.svg"} alt={title} className="w-full rounded-xl mb-6 object-cover h-64" />

          <div className="prose max-w-none text-gray-700 space-y-4">
            {content.split("\n").map((paragraph, idx) => paragraph.trim() && <p key={idx}>{paragraph}</p>)}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animation-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
