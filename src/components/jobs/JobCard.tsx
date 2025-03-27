import Link from "next/link"
import type { JobRead } from "@/types/api"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, DollarSign } from "lucide-react"

interface JobCardProps {
  job: JobRead
}

export default function JobCard({ job }: JobCardProps) {
  // Format duration in minutes to hours and minutes
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

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {job.icon && job.icon.image && (
              <img
                src={job.icon.image || "/placeholder.svg"}
                alt={job.icon.name}
                className="w-10 h-10 object-contain"
              />
            )}
            <CardTitle className="text-xl">{job.title}</CardTitle>
          </div>
          <Badge>{`$${job.cost.toFixed(2)}`}</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">{job.description}</p>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{job.address}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock size={16} className="mr-2 flex-shrink-0" />
            <span>{formatDuration(job.duration)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign size={16} className="mr-2 flex-shrink-0" />
            <span>${job.cost.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/jobs/${job.user}`} className="w-full">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

