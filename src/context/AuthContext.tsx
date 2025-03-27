"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "../types/api"
import { getCurrentUser, sendSmsCode, verifySmsCode } from "../lib/api"
import { useToast } from "../components/ui/use-toast"
import Cookies from "js-cookie"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (phoneNumber: string, otpCode: string) => Promise<boolean>
  requestOtp: (phoneNumber: string) => Promise<boolean>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const checkAuth = async () => {
      const token = Cookies.get("token")
      if (token) {
        try {
          const userData = await getCurrentUser()
          setUser(userData)
        } catch (error) {
          console.error("Failed to fetch user data:", error)
          Cookies.remove("token")
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const requestOtp = async (phoneNumber: string): Promise<boolean> => {
    try {
      await sendSmsCode(phoneNumber)
      toast({
        title: "OTP Sent",
        description: "Please check your phone for the verification code.",
      })
      return true
    } catch (error) {
      console.error("Failed to send OTP:", error)
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const login = async (phoneNumber: string, otpCode: string): Promise<boolean> => {
    try {
      const { token } = await verifySmsCode(phoneNumber, otpCode)
      // Store token in both localStorage (for API calls) and cookies (for SSR)
      localStorage.setItem("token", token)
      Cookies.set("token", token, { expires: 7 }) // 7 days expiry

      const userData = await getCurrentUser()
      setUser(userData)

      toast({
        title: "Login Successful",
        description: "You have been successfully logged in.",
      })

      return true
    } catch (error) {
      console.error("Login failed:", error)
      toast({
        title: "Login Failed",
        description: "Invalid verification code. Please try again.",
        variant: "destructive",
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    Cookies.remove("token")
    setUser(null)
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  const refreshUser = async () => {
    try {
      const userData = await getCurrentUser()
      setUser(userData)
    } catch (error) {
      console.error("Failed to refresh user data:", error)
      toast({
        title: "Error",
        description: "Failed to refresh user data.",
        variant: "destructive",
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        requestOtp,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

