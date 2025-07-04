import '../styles/globals.css'
import 'prismjs/themes/prism-tomorrow.css'
import type { AppProps } from 'next/app'
import { Sidebar } from '../components/Sidebar'
import Script from 'next/script'
import React from 'react'

function App({ Component, pageProps }: AppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false)

  return (
    <div className="flex bg-gray-50 text-gray-800">
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 bg-white rounded-md shadow-md hover:bg-gray-50"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <div className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>
      
      <div className="flex-1 flex flex-col min-h-screen">
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-4xl mx-auto w-full">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </div>
  )
}

const Footer: React.FC = () => {
  return (
    <footer className="w-full text-center py-4 text-sm text-gray-600">
      <hr className="border-gray-200" />
      <p className="mt-4">&copy; 2025 junk0612</p>
    </footer>
  )
}

export default App
