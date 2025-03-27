"use client"

import { useEffect, useState } from "react"
import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()
  const [profileData, setProfileData] = useState(null)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/profile", {
          headers: { Authorization: `Bearer ${user?.token}` },
        })
        if (!response.ok) throw new Error("Failed to fetch profile data")
        const data = await response.json()
        setProfileData(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (isAuthenticated) fetchProfile()
  }, [isAuthenticated, user])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Profile</h1>
      {profileData ? <ProfileForm initialData={profileData} /> : <p>Loading profile...</p>}
    </div>
  )
}
