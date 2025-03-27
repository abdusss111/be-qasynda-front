"use client"

import Link from "next/link"
import { useState } from "react"
import { Plus, Edit, Trash } from "lucide-react"

export default function MyJobsPage() {
  // Sample job data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Frontend Developer",
      description: "We're looking for a skilled frontend developer to join our team.",
      location: "San Francisco, CA",
      cost: 120,
      duration: 120, // 2 hours in minutes
      applications: 5,
    },
    {
      id: 2,
      title: "UX Designer",
      description: "Design user experiences for our web and mobile applications.",
      location: "Remote",
      cost: 150,
      duration: 180, // 3 hours in minutes
      applications: 3,
    },
    {
      id: 3,
      title: "Backend Developer",
      description: "Develop and maintain our server-side applications.",
      location: "New York, NY",
      cost: 130,
      duration: 240, // 4 hours in minutes
      applications: 7,
    },
  ])

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60

    if (hours === 0) {
      return `${mins} min`
    } else if (mins === 0) {
      return `${hours} hr`
    } else {
      return `${hours} hr ${mins} min`
    }
  }

  const handleDeleteJob = (id: number) => {
    setJobs(jobs.filter((job) => job.id !== id))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Jobs</h1>
        <Link
          href="/my-jobs/create"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Create New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs created yet</h3>
          <p className="text-gray-500 mb-4">Create your first job posting to start receiving applications.</p>
          <Link
            href="/my-jobs/create"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 inline-flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Create New Job
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {jobs.map((job) => (
              <li key={job.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {job.applications} applications
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{job.location}</p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        ${job.cost.toFixed(2)}
                      </p>
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                        {formatDuration(job.duration)}
                      </p>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 sm:mt-0">
                      <Link href={`/my-jobs/edit/${job.id}`} className="text-blue-600 hover:text-blue-900">
                        <Edit size={18} />
                      </Link>
                      <button onClick={() => handleDeleteJob(job.id)} className="text-red-600 hover:text-red-900">
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">{job.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

