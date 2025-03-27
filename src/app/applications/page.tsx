"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationList from "../../components/applications/ApplicationList"
import { useAuth } from "../../context/AuthContext"
import { useRouter } from "next/navigation"

export default function ApplicationsPage() {
  const { isAuthenticated, isLoading, token } = useAuth()
  const [activeTab, setActiveTab] = useState("submitted")
  const [applications, setApplications] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isLoading, isAuthenticated, router])

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`/api/job-applications/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setApplications(data))
        .catch((err) => console.error("Failed to fetch applications:", err))
    }
  }, [isAuthenticated, token])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

      <Tabs defaultValue="submitted" onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="submitted">My Applications</TabsTrigger>
          <TabsTrigger value="received">Received Applications</TabsTrigger>
        </TabsList>

        <TabsContent value="submitted">
          <ApplicationList type="submitted" applications={applications} />
        </TabsContent>

        <TabsContent value="received">
          <ApplicationList type="received" applications={applications} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
