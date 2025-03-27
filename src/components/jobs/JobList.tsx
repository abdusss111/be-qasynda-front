"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { getJobs } from "@/lib/api"
import JobCard from "./JobCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function JobList() {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 40.7128, lng: -74.006 }) // Default to NYC
  const [radius, setRadius] = useState(10)
  const [page, setPage] = useState(1)
  const { toast } = useToast()

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
          toast({
            title: "Location Error",
            description: "Unable to get your location. Using default location.",
            variant: "destructive",
          })
          // Default location already set in state
        },
      )
    } else {
      toast({
        title: "Location Not Supported",
        description: "Geolocation is not supported by your browser. Using default location.",
        variant: "destructive",
      })
      // Default location already set in state
    }
  }, [toast])

  // Fetch jobs based on location and radius
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["jobs", location.lat, location.lng, radius, page],
    queryFn: () => getJobs(location.lat, location.lng, radius, page),
  })

  const handleRadiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadius(Number.parseInt(e.target.value) || 10)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">Error loading jobs: {(error as Error).message}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end">
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
                onChange={handleRadiusChange}
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
              <Input id="search" type="text" placeholder="Search jobs..." className="pl-10" />
            </div>
          </div>
          <Button className="w-full md:w-auto">Search</Button>
        </div>
      </div>

      {!data || data.results.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No jobs found in your area. Try increasing the search radius.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.results.map((job) => (
              <JobCard key={job.user} job={job} />
            ))}
          </div>

          {/* Pagination */}
          {data && (
            <div className="flex justify-center mt-8">
              <div className="flex gap-2">
                <Button variant="outline" disabled={!data.previous} onClick={() => setPage(page - 1)}>
                  Previous
                </Button>
                <Button variant="outline" disabled={!data.next} onClick={() => setPage(page + 1)}>
                  Next
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

