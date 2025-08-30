import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "ITW Registration - Inclusive Technology of Washington",
  description: "Registration form for developmental disabilities programs at ITW",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <Toaster 
          position="top-right"
          richColors
          closeButton
          duration={5000}
          className="font-sans"
        />
      </body>
    </html>
  )
}
