import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import 'zenn-content-css'
import Script from 'next/script'

function App({ Component, pageProps }: AppProps) {
  return (
    <div className="py-0 md:px-8 min-h-screen flex flex-col items-center">
      <Header />
      <Component {...pageProps} />
      <Footer />
    </div>
  )
}

const Footer: React.FC = () => {
  return (
    <div className="flex md:justify-center w-full">
      <div className="flex flex-col md:max-w-4xl w-full">
        <hr />
        <div className="flex justify-center pt-4 pb-8">&#xA9; 2022 junk0612</div>
      </div>
    </div>
  )
}

export default App
