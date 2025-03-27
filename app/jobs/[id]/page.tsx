"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Clock, DollarSign, ArrowLeft } from "lucide-react"

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const jobId = params.id

  // In a real app, you would fetch the job details based on the ID
  const job = {
    id: Number.parseInt(jobId),
    title: "Software Developer",
    company: "Tech Solutions Inc.",
    location: "San Francisco, CA",
    description:
      "We're looking for a skilled software developer to join our team. The ideal candidate will have experience with React, Node.js, and TypeScript. This is a full-time position with competitive salary and benefits.",
    requirements:
      "- 3+ years of experience with React\n- Strong knowledge of JavaScript/TypeScript\n- Experience with Node.js and Express\n- Familiarity with Git and CI/CD pipelines\n- Good communication skills",
    cost: 120,
    duration: 120, // 2 hours in minutes
  }

  const [comment, setComment] = useState("")
  const [userCost, setUserCost] = useState(job.cost.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      alert("Application submitted successfully!")
      setComment("")
      setUserCost(job.cost.toString())
    }, 1500)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Link href="/jobs" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={16} className="mr-1" />
        Back to Jobs
      </Link>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h1 className="text-2xl font-bold text-gray-900">{job.title}</h1>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{job.company}</p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3 mb-6">
            <div className="flex items-center text-sm text-gray-500">
              <MapPin size={18} className="mr-2 flex-shrink-0" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock size={18} className="mr-2 flex-shrink-0" />
              <span>{formatDuration(job.duration)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign size={18} className="mr-2 flex-shrink-0" />
              <span>${job.cost.toFixed(2)}</span>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
            <p className="text-gray-700">{job.description}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">Requirements</h2>
            <div className="text-gray-700 whitespace-pre-line">{job.requirements}</div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg font-medium text-gray-900">Apply for this Job</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Submit your application with your proposed cost and any comments.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userCost" className="block text-sm font-medium text-gray-700 mb-1">
                Your Proposed Cost ($)
              </label>
              <input
                type="number"
                id="userCost"
                value={userCost}
                onChange={(e) => setUserCost(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                min="0"
                step="0.01"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
                Comments (Optional)
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                placeholder="Add any additional information about your application..."
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

