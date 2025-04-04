import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          {/* Brand Section */}
          <div className='mb-6 md:mb-0'>
            <h2 className='text-2xl font-bold text-white font-palanquin mb-2'>Inter Code</h2>
            <p className='text-gray-500 text-sm'>© 2025 All rights reserved</p>
          </div>

          {/* Links Section */}
          <nav className='flex flex-wrap justify-center gap-6 md:gap-8'>
            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
              Privacy Policy
            </a>
            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
              Terms of Service
            </a>
            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
              Support
            </a>
            <a href="#" className='text-gray-400 hover:text-white transition-colors duration-200'>
              Contact Us
            </a>
          </nav>
        </div>

        {/* Optional: Social Icons or Additional Info */}
        <div className='mt-8 pt-8 border-t border-gray-800 flex justify-center'>
          <p className='text-gray-500 text-sm'>
            Made with ❤️ for developers worldwide
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer