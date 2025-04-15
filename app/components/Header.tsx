'use client';

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { UserCircleIcon, PlusCircleIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm relative">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/zesty-logo.png"
              alt="Zesty"
              width={140}
              height={56}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/browse" className="text-gray-600 hover:text-primary">
              Browse Ads
            </Link>
            <Link href="/news" className="text-gray-600 hover:text-primary">
              News
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary">
              Contact
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login" className="flex items-center text-gray-600 hover:text-primary">
              <UserCircleIcon className="w-6 h-6 mr-1" />
              <span>Login</span>
            </Link>
            <Link href="/login" className="btn-primary flex items-center">
              <PlusCircleIcon className="w-5 h-5 mr-1" />
              <span>Submit Ad</span>
            </Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 shadow-lg z-50">
            <nav className="flex flex-col py-4">
              <Link 
                href="/browse" 
                className="px-6 py-3 text-gray-600 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Browse Ads
              </Link>
              <Link 
                href="/news" 
                className="px-6 py-3 text-gray-600 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                News
              </Link>
              <Link 
                href="/contact" 
                className="px-6 py-3 text-gray-600 hover:text-primary hover:bg-gray-50"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link 
                  href="/login"
                  className="w-full px-6 py-3 flex items-center text-gray-600 hover:text-primary hover:bg-gray-50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <UserCircleIcon className="w-6 h-6 mr-2" />
                  <span>Login</span>
                </Link>
                <Link 
                  href="/login"
                  className="mx-6 mt-2 btn-primary w-full flex items-center justify-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <PlusCircleIcon className="w-5 h-5 mr-2" />
                  <span>Submit Ad</span>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header 