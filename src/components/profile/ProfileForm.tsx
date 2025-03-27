"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { updateCurrentUser } from "@/lib/api"
import type { PatchedUser } from "@/types/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileForm() {
  const { user, refreshUser } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<PatchedUser>({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    profile_image: user?.profile_image || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await updateCurrentUser(formData)
      await refreshUser()
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast({
        title: "Update Failed",
        description: "Failed to update your profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Please log in to view your profile.</p>
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>Update your personal information</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="phone_number" className="text-sm font-medium">
              Phone Number
            </label>
            <Input id="phone_number" value={user.phone_number} disabled className="bg-gray-50" />
            <p className="text-xs text-gray-500">Phone number cannot be changed</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="first_name" className="text-sm font-medium">
              First Name
            </label>
            <Input
              id="first_name"
              name="first_name"
              value={formData.first_name || ""}
              onChange={handleChange}
              placeholder="Enter your first name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="last_name" className="text-sm font-medium">
              Last Name
            </label>
            <Input
              id="last_name"
              name="last_name"
              value={formData.last_name || ""}
              onChange={handleChange}
              placeholder="Enter your last name"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="profile_image" className="text-sm font-medium">
              Profile Image URL
            </label>
            <Input
              id="profile_image"
              name="profile_image"
              value={formData.profile_image || ""}
              onChange={handleChange}
              placeholder="Enter profile image URL"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Profile"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

