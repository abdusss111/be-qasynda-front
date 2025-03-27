"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendCode = async () => {
    // Show loading state
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Skip verification and redirect directly to jobs page
      setIsLoading(false)
      router.push("/jobs")
    }, 1500) // 1.5 second delay to simulate API call
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Login Page</h1>
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            type="button"
            onClick={handleSendCode}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Send Code"}
          </button>
          <Link href="/" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

