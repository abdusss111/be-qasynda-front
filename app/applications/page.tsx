"use client"

import { useState } from "react"

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("submitted")

  // Sample application data
  const submittedApplications = [
    { id: 1, jobTitle: "Software Developer", company: "Tech Co", status: "PENDING", date: "2023-10-15" },
    { id: 2, jobTitle: "UX Designer", company: "Design Studio", status: "APPROVED", date: "2023-10-10" },
    { id: 3, jobTitle: "Project Manager", company: "Management Inc", status: "REJECTED", date: "2023-10-05" },
  ]

  const receivedApplications = [
    { id: 4, applicantName: "John Doe", jobTitle: "Frontend Developer", status: "PENDING", date: "2023-10-16" },
    { id: 5, applicantName: "Jane Smith", jobTitle: "Frontend Developer", status: "PENDING", date: "2023-10-14" },
    { id: 6, applicantName: "Mike Johnson", jobTitle: "Frontend Developer", status: "APPROVED", date: "2023-10-12" },
  ]

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800"
      case "APPROVED":
        return "bg-green-100 text-green-800"
      case "REJECTED":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Job Applications</h1>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex">
            <button
              onClick={() => setActiveTab("submitted")}
              className={`py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === "submitted"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab("received")}
              className={`ml-8 py-2 px-4 text-center border-b-2 font-medium text-sm ${
                activeTab === "received"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Received Applications
            </button>
          </nav>
        </div>
      </div>

      {activeTab === "submitted" ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {submittedApplications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">{application.jobTitle}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}
                      >
                        {application.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500">{application.company}</p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Applied on {application.date}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {receivedApplications.map((application) => (
              <li key={application.id}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-blue-600 truncate">
                      {application.applicantName} - {application.jobTitle}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(application.status)}`}
                      >
                        {application.status}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <p>Received on {application.date}</p>
                    </div>
                    {application.status === "PENDING" && (
                      <div className="mt-2 sm:mt-0 flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600">
                          Accept
                        </button>
                        <button className="px-3 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600">
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

