'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showTypePopup, setShowTypePopup] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      })

      // Ignore email confirmation errors
      if (signInError && !signInError.message.includes('Email not confirmed')) {
        throw signInError
      }

      // Check if user exists in business_owner table
      const { data: businessOwner, error: businessError } = await supabase
        .from('business_owner')
        .select('*')
        .eq('email', formData.email)
        .single()

      // Check if user exists in normal_user table
      const { data: normalUser, error: normalError } = await supabase
        .from('normal_user')
        .select('*')
        .eq('email', formData.email)
        .single()

      // Redirect based on user type
      if (businessOwner) {
        router.push('/business-dashboard')
      } else if (normalUser) {
        router.push('/user-profile')
      } else {
        // If no profile exists, create one based on the auth user data
        const { data: authUser } = await supabase.auth.getUser()
        if (authUser?.user) {
          const profileData = {
            id: authUser.user.id,
            email: authUser.user.email!,
            full_name: 'User',  // Default name
            phone: '',  // Empty phone
            profile_image: null
          }

          // Try to create a normal user profile
          await supabase
            .from('normal_user')
            .insert([profileData])
            .select()
            .single()

          router.push('/user-profile')
          return
        }
        throw new Error('User profile not found in either business_owner or normal_user tables')
      }

    } catch (err: any) {
      // Don't show email confirmation errors to the user
      if (err.message?.includes('Email not confirmed')) {
        // Just proceed with the login flow
        const { data: businessOwner } = await supabase
          .from('business_owner')
          .select('*')
          .eq('email', formData.email)
          .single()

        if (businessOwner) {
          router.push('/business-dashboard')
          return
        }

        const { data: normalUser } = await supabase
          .from('normal_user')
          .select('*')
          .eq('email', formData.email)
          .single()

        if (normalUser) {
          router.push('/user-profile')
          return
        }
      }

      console.error('Login error details:', err)
      setError(err.message || 'An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  const handleTypeSelect = (type: 'normal' | 'business') => {
    setShowTypePopup(false)
    router.push(`/register?type=${type}`)
  }

  const inputStyles = "appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 outline-none focus:border-primary sm:text-sm"

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <button
              onClick={() => setShowTypePopup(true)}
              className="font-medium text-primary hover:text-primary/80"
            >
              create a new account
            </button>
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={inputStyles}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={inputStyles}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50"
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Google</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                </button>

                <button
                  type="button"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Sign in with Facebook</span>
                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Type Selection Popup */}
      {showTypePopup && (
        <div className="fixed inset-0 z-50">
          {/* Overlay */}
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          
          {/* Popup Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full my-8">
              <div className="sticky top-0 px-6 py-4 border-b border-gray-200 bg-white rounded-t-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Choose Your Account Type</h2>
                  <button
                    onClick={() => setShowTypePopup(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Close</span>
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(100vh-10rem)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Normal User Card */}
                  <div 
                    onClick={() => handleTypeSelect('normal')}
                    className="relative group cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-all duration-200"
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        5 ads/month
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
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
                    onClick={() => handleTypeSelect('business')}
                    className="relative group cursor-pointer p-6 border-2 border-gray-200 rounded-lg hover:border-primary transition-all duration-200"
                  >
                    <div className="absolute top-0 right-0 p-2">
                      <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        50 ads/month
                      </div>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
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
        </div>
      )}
    </>
  )
} 