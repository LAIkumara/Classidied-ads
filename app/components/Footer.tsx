import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12 sm:py-16 px-4 sm:px-6">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Modern classified ads platform connecting buyers and sellers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link href="/browse" className="text-gray-400 hover:text-primary transition-colors">
                  Browse Ads
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-gray-400 hover:text-primary transition-colors">
                  Submit Ad
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li className="flex items-start">
                <span className="block">711 Nulla St. Mankato Mississippi 96522</span>
              </li>
              <li className="flex items-center">
                <span>+(11) 761 89 63</span>
              </li>
              <li className="flex items-center">
                <span>contact@adifier.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Subscribe to receive updates and new listings.
            </p>
            <form className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 rounded-md sm:rounded-r-none text-dark text-sm sm:text-base"
              />
              <button 
                type="submit"
                className="bg-primary px-6 py-2 rounded-md sm:rounded-l-none hover:bg-opacity-90 transition-all text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-8 text-center text-gray-400 text-sm sm:text-base">
          <p>&copy; {new Date().getFullYear()} Adifier. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer 