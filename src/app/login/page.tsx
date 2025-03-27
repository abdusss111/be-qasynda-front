"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await axios.post(`${API_URL}/api/users/send-sms/`, { phone: phoneNumber })
      setOtpSent(true)
      toast({ title: "OTP Sent", description: "Please check your phone for the verification code." })
    } catch (error) {
      toast({ title: "Error", description: "Failed to send verification code.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await axios.post(`${API_URL}/api/users/verify-sms/`, { phone: phoneNumber, code: otpCode })
      localStorage.setItem("token", response.data.token)
      toast({ title: "Login Successful", description: "You have been successfully logged in." })
      router.push("/jobs")
    } catch (error) {
      toast({ title: "Login Failed", description: "Invalid verification code.", variant: "destructive" })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          {otpSent ? "Enter the verification code sent to your phone" : "Enter your phone number to receive a verification code"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!otpSent ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
              <Input id="phone" type="tel" placeholder="+1234567890" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Sending..." : "Send Verification Code"}</Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">Verification Code</label>
              <Input id="otp" type="text" placeholder="Enter code" value={otpCode} onChange={(e) => setOtpCode(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? "Verifying..." : "Verify Code"}</Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        {otpSent && <Button variant="link" onClick={() => setOtpSent(false)} disabled={isLoading}>Change phone number</Button>}
      </CardFooter>
    </Card>
  )
} 
