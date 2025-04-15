'use client'

import { useState } from 'react'
import { createUser, supabase } from '@/lib/supabase'

export default function TestDBComponent() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const testConnection = async () => {
    try {
      setLoading(true)
      setMessage('Testing connection...')
      setError('')
      
      // Test connection by fetching categories
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .limit(1)

      if (error) throw error
      
      setMessage('✅ Database connection successful!')
      console.log('Test data:', data)
    } catch (err: any) {
      setError(`❌ Connection failed: ${err?.message || 'Unknown error'}`)
      console.error('Connection error:', err)
    } finally {
      setLoading(false)
    }
  }

  const testSignup = async () => {
    try {
      setLoading(true)
      setMessage('Testing signup...')
      setError('')
      
      // Test normal user signup
      const newUser = await createUser({
        email: 'test@example.com',
        full_name: 'Test User',
        phone: '1234567890',
        profile_image: null
      }, 'normal')

      setMessage('✅ Signup successful!')
      console.log('New user:', newUser)
    } catch (err: any) {
      setError(`❌ Signup failed: ${err?.message || 'Unknown error'}`)
      console.error('Signup error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Database Test Page
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Test your database connection and signup process
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="space-y-4">
            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50"
            >
              Test Database Connection
            </button>

            <button
              onClick={testSignup}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none disabled:opacity-50"
            >
              Test Signup Process
            </button>
          </div>

          {loading && (
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-blue-800">Loading...</p>
                </div>
              </div>
            </div>
          )}

          {message && !error && (
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 