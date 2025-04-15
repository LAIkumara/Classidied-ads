'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

// Update the type to match actual database columns
type BusinessOwner = {
  id: string
  email: string
  full_name: string
  phone: string
  profile_image: string | null
  business_nam: string  // Changed from business_name
  business_addr: string // Changed from business_address
  created_at: string
}

export default function BusinessDashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<BusinessOwner | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }

        // Fetch business owner profile by email
        const { data, error } = await supabase
          .from('business_owner')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (error) {
          console.error('Database error:', error)
          router.push('/login')
          return
        }

        if (!data) {
          console.error('No business owner found')
          router.push('/login')
          return
        }

        console.log('Business owner data:', data)
        setUser(data)
      } catch (error) {
        console.error('Error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-8">Business Dashboard</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Business Name</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{user.business_nam}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Owner Name</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{user.full_name}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{user.email}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Business Address</label>
                    <div className="mt-1">
                      <p className="text-gray-900">{user.business_addr}</p>
                    </div>
                  </div>

                  {user.profile_image && (
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">Business Logo</label>
                      <div className="mt-1">
                        <img
                          src={user.profile_image}
                          alt="Business Logo"
                          className="h-32 w-32 rounded-lg object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 