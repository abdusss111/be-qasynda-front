"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getJobApplications } from "@/lib/api"
import type { StatusEnum } from "@/types/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { acceptJobApplication, rejectJobApplication, cancelJobApplication } from "@/lib/api"

interface ApplicationListProps {
  type: "submitted" | "received"
}

export default function ApplicationList({ type }: ApplicationListProps) {
  const [isActionLoading, setIsActionLoading] = useState<number | null>(null)
  const { toast } = useToast()

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["applications", type],
    queryFn: () => getJobApplications(undefined, type === "submitted", type === "received"),
  })

  const handleAccept = async (id: number) => {
    setIsActionLoading(id)
    try {
      await acceptJobApplication(id)
      toast({
        title: "Application Accepted",
        description: "The job application has been accepted successfully.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to accept the application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsActionLoading(null)
    }
  }

  const handleReject = async (id: number) => {
    setIsActionLoading(id)
    try {
      await rejectJobApplication(id)
      toast({
        title: "Application Rejected",
        description: "The job application has been rejected.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject the application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsActionLoading(null)
    }
  }

  const handleCancel = async (id: number) => {
    setIsActionLoading(id)
    try {
      await cancelJobApplication(id)
      toast({
        title: "Application Cancelled",
        description: "Your job application has been cancelled.",
      })
      refetch()
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel the application. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsActionLoading(null)
    }
  }

  const getStatusBadge = (status: StatusEnum) => {
    switch (status) {
      case "PENDING":
        return <Badge variant="secondary">Pending</Badge>
      case "APPROVED":
        return <Badge variant="default">Approved</Badge>
      case "REJECTED":
        return <Badge variant="destructive">Rejected</Badge>
      case "CANCELLED":
        return <Badge variant="outline">Cancelled</Badge>
      default:
        return null
    }
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
        <p className="text-red-500">Error loading applications</p>
        <Button onClick={() => refetch()} className="mt-4">
          Try Again
        </Button>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          {type === "submitted"
            ? "You have not submitted any job applications yet."
            : "You have not received any job applications yet."}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.job}</TableCell>
              <TableCell>{getStatusBadge(application.status)}</TableCell>
              <TableCell>${application.user_cost?.toFixed(2) || "N/A"}</TableCell>
              <TableCell>{application.comment || "No comment"}</TableCell>
              <TableCell className="text-right">
                {type === "received" && application.status === "PENDING" && (
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleAccept(application.id)}
                      disabled={isActionLoading === application.id}
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleReject(application.id)}
                      disabled={isActionLoading === application.id}
                    >
                      Reject
                    </Button>
                  </div>
                )}
                {type === "submitted" && application.status === "PENDING" && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCancel(application.id)}
                    disabled={isActionLoading === application.id}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

