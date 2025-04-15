'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  UserIcon, 
  BuildingOfficeIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

export default function UserTypePopup() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)

  const handleSelect = (type: 'normal' | 'business') => {
    router.push(`/register?type=${type}`)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900">Choose Your Account Type</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Normal User Card */}
            <div 
              onClick={() => handleSelect('normal')}
              className="relative group cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-all duration-200"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  5 ads/month
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <UserIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Normal User</h3>
                <p className="text-gray-600 mb-4">
                  Perfect for individuals who want to sell their personal items. You can post up to 5 advertisements per month.
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Best for:</span>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>• Selling personal items</li>
                    <li>• Occasional selling</li>
                    <li>• Individual sellers</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Business Owner Card */}
            <div 
              onClick={() => handleSelect('business')}
              className="relative group cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-all duration-200"
            >
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  50 ads/month
                </div>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BuildingOfficeIcon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Business Owner</h3>
                <p className="text-gray-600 mb-4">
                  Ideal for businesses and frequent sellers. Post up to 50 advertisements per month and manage multiple listings.
                </p>
                <div className="mt-4">
                  <span className="text-sm text-gray-500">Best for:</span>
                  <ul className="mt-2 text-sm text-gray-600 space-y-1">
                    <li>• Businesses</li>
                    <li>• Frequent sellers</li>
                    <li>• Multiple listings</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>If you have a business or want to place more advertisements, select business owner.</p>
            <p>If you want to sell some of your products, click the normal user button.</p>
          </div>
        </div>
      </div>
    </div>
  )
} 