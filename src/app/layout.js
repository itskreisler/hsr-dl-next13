import './styles/globals.scss'
import { Nunito } from 'next/font/google'

const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'HRS-DL',
  description: 'Web app for Honkai Star Rail',
  keywords: 'honkai,star,rail'
}

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body className={nunito.className}>{children}</body>
    </html>
  )
}
