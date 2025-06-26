import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Sidebar } from '../components/Sidebar'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 text-gray-800">
      <div className="w-full max-w-7xl px-4">
        <Header />
        <div className="flex flex-col lg:flex-row gap-8">
          <main className="flex-1 min-w-0">
            <Component {...pageProps} />
          </main>
          <Sidebar />
        </div>
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
