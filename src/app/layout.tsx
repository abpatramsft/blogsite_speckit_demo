import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'BlogSite - Modern Web Development Insights',
    template: '%s | BlogSite',
  },
  description: 'Explore the latest in web development, design, and technology. Learn about Next.js, TypeScript, CSS, and more.',
  keywords: ['blog', 'web development', 'Next.js', 'React', 'TypeScript', 'CSS', 'programming'],
  authors: [{ name: 'Jane Doe' }],
  creator: 'Jane Doe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blogsite.example.com',
    siteName: 'BlogSite',
    title: 'BlogSite - Modern Web Development Insights',
    description: 'Explore the latest in web development, design, and technology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlogSite - Modern Web Development Insights',
    description: 'Explore the latest in web development, design, and technology.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
