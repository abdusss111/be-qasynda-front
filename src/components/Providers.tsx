"use client"

import type React from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { AuthProvider } from "@/context/AuthContext"
import Header from "@/components/layout/Header"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  // Create a client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Disable automatic refetching on window focus for better performance
            refetchOnWindowFocus: false,
            // Retry failed queries 1 time
            retry: 1,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </AuthProvider>
    </QueryClientProvider>
  )
}

