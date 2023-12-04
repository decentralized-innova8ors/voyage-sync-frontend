import { Inter, Podkova } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })
const podkova = Podkova({ variable: "--heading-font", subsets: ['latin']})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${podkova.variable}`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
