import type React from "react"
import "./globals.css"
import Navigation from "@/components/layout/Navigation"

export const metadata = {
  title: "Job Application Platform",
  description: "Find and apply for jobs in your area",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'