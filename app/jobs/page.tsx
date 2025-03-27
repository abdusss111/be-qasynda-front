import Link from "next/link"

export default function Jobs() {
  // Sample job data
  const jobs = [
    {
      id: 1,
      title: "Software Developer",
      company: "Tech Solutions Inc.",
      location: "San Francisco, CA",
    },
    {
      id: 2,
      title: "Marketing Specialist",
      company: "Growth Marketing",
      location: "New York, NY",
    },
    {
      id: 3,
      title: "Customer Support",
      company: "Service First",
      location: "Chicago, IL",
    },
  ]

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Available Jobs</h1>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <div key={job.id} className="border p-4 rounded shadow-sm">
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <button className="mt-2 px-4 py-1 bg-blue-500 text-white rounded text-sm">View Details</button>
          </div>
        ))}
      </div>
    </div>
  )
}

