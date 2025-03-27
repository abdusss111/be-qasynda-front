"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function SyntheticV0PageForDeployment() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-4xl font-bold mb-6">Find Jobs Near You</h1>
      <p className="text-xl text-gray-600 max-w-2xl mb-8">
        Browse local job opportunities, apply with a single click, and connect with employers in your area.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => router.push("/jobs")}>
          Browse Jobs
        </Button>
        <Button size="lg" variant="outline" onClick={() => router.push("/login")}>
          Sign In
        </Button>
      </div>
    </div>
  )
}

