import Image from 'next/image'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const categories = [
  { name: 'Vehicles', count: 0, icon: '🚗' },
  { name: 'Real Estate', count: 0, icon: '🏠' },
  { name: 'Computers', count: 0, icon: '💻' },
  { name: 'Services', count: 0, icon: '🔧' },
  { name: 'Drones', count: 0, icon: '🛸' },
  { name: 'Electronics', count: 0, icon: '📱' },
  { name: 'Jobs', count: 0, icon: '💼' },
  { name: 'Furniture', count: 0, icon: '🪑' },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-dark text-white py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Check out ads submitted by our members and join us today
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300">
              Browse from more than <span className="text-primary font-semibold">15,000,000</span> adverts while new ones come on daily basis
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-lg p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="flex-1 px-4 py-2 text-dark outline-none rounded-md sm:rounded-none"
              />
              <button className="bg-primary text-white px-6 py-2 rounded-md flex items-center justify-center sm:justify-start">
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Popular Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <div
                key={category.name}
                className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center hover:shadow-lg transition-shadow cursor-pointer transform hover:-translate-y-1 duration-200"
              >
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{category.icon}</div>
                <h3 className="font-semibold mb-1 sm:mb-2 text-lg">{category.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{category.count} ads</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <button className="btn-secondary w-full sm:w-auto">
              Browse All Categories
            </button>
          </div>
        </div>
      </section>
    </main>
  )
} 