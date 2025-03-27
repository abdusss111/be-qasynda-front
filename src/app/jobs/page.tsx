"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, MapPin, Briefcase } from "lucide-react"

export default function JobsPage() {
  const [radius, setRadius] = useState(10)
  const [jobs, setJobs] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs/")
        if (!response.ok) throw new Error("Failed to fetch jobs")
        const data = await response.json()
        setJobs(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchJobs()
  }, [])

  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Find Your Dream Job</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-auto flex-grow">
          <label htmlFor="radius" className="block text-sm font-medium text-gray-700 mb-1">
            Search Radius (km)
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="radius"
              type="number"
              min="1"
              max="100"
              value={radius}
              onChange={(e) => setRadius(Number.parseInt(e.target.value) || 10)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="w-full md:w-auto flex-grow">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Jobs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="search"
              type="text"
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button className="w-full md:w-auto bg-blue-600 text-white hover:bg-blue-700">Search</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="h-full flex flex-col bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="bg-blue-600 text-white p-4">
              <div className="flex items-center gap-2">
                <Briefcase size={20} />
                <CardTitle className="text-lg">{job.title}</CardTitle>
              </div>
              <CardDescription className="text-gray-200">{job.company}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow p-4">
              <p className="text-sm text-gray-500 mb-2">📍 {job.location}</p>
              <p className="text-sm mb-4 text-gray-700">{job.description}</p>
              <p className="text-sm font-medium text-gray-900">💰 {job.salary}</p>
            </CardContent>
            <CardFooter className="p-4">
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
