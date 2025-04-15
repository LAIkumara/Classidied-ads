'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { NormalUser } from '@/lib/supabase'

export default function UserProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<NormalUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (!session) {
          router.push('/login')
          return
        }

        // Fetch normal user profile
        const { data, error } = await supabase
          .from('normal_user')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (error || !data) {
          // If no normal user profile found, redirect to login
          router.push('/login')
          return
        }

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
                <h3 className="text-2xl font-bold leading-6 text-gray-900 mb-8">User Profile</h3>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
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

                  {user.profile_image && (
                    <div className="sm:col-span-6">
                      <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                      <div className="mt-1">
                        <img
                          src={user.profile_image}
                          alt="Profile"
                          className="h-32 w-32 rounded-full object-cover"
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