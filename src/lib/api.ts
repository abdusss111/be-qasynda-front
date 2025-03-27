import axios from "axios"
import type {
  JobApplicationCreate,
  JobApplicationRead,
  JobRead,
  Login,
  OTP,
  PaginatedJobReadList,
  PatchedJobCreateUpdate,
  PatchedUser,
  User,
  Icon,
} from "../types/api"
import Cookies from "js-cookie"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Add token to requests if available
api.interceptors.request.use((config) => {
  // Try to get token from cookies first (for SSR), then localStorage
  const token = Cookies.get("token") || localStorage.getItem("token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Authentication
export const sendSmsCode = async (phoneNumber: string): Promise<void> => {
  const payload: Login = { phone_number: phoneNumber }
  await api.post("/api/users/send-sms/", payload)
}

export const verifySmsCode = async (phoneNumber: string, otpCode: string): Promise<{ token: string }> => {
  const payload: OTP = { phone_number: phoneNumber, otp_code: otpCode }
  const response = await api.post("/api/users/verify-sms/", payload)
  return response.data
}

// User
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get("/api/users/me/")
  return response.data
}

export const updateCurrentUser = async (userData: PatchedUser): Promise<User> => {
  const response = await api.patch("/api/users/me/", userData)
  return response.data
}

export const getUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/api/users/${id}/`)
  return response.data
}

// Jobs
export const getJobs = async (lat: number, lng: number, radius = 10, page?: number): Promise<PaginatedJobReadList> => {
  const params = { lat, lng, radius, ...(page && { page }) }
  const response = await api.get("/api/jobs/", { params })
  return response.data
}

export const getJobById = async (id: number): Promise<JobRead> => {
  const response = await api.get(`/api/jobs/${id}/`)
  return response.data
}

export const createJob = async (jobData: PatchedJobCreateUpdate): Promise<JobRead> => {
  const response = await api.post("/api/jobs/", jobData)
  return response.data
}

export const updateJob = async (id: number, jobData: PatchedJobCreateUpdate): Promise<JobRead> => {
  const response = await api.patch(`/api/jobs/${id}/`, jobData)
  return response.data
}

export const deleteJob = async (id: number): Promise<void> => {
  await api.delete(`/api/jobs/${id}/`)
}

export const getMyJobs = async (): Promise<JobRead> => {
  const response = await api.get("/api/jobs/my-jobs/")
  return response.data
}

// Job Applications
export const getJobApplications = async (
  jobId?: string,
  myResponse?: boolean,
  received?: boolean,
): Promise<JobApplicationRead[]> => {
  const params = {
    ...(jobId && { job_id: jobId }),
    ...(myResponse !== undefined && { my_response: myResponse }),
    ...(received !== undefined && { received: received }),
  }
  const response = await api.get("/api/job-applications/", { params })
  return response.data
}

export const getJobApplicationById = async (id: number): Promise<JobApplicationRead> => {
  const response = await api.get(`/api/job-applications/${id}/`)
  return response.data
}

export const submitJobApplication = async (applicationData: JobApplicationCreate): Promise<JobApplicationRead> => {
  const response = await api.post("/api/job-applications/submit/", applicationData)
  return response.data
}

export const acceptJobApplication = async (id: number): Promise<JobApplicationRead> => {
  const application = await getJobApplicationById(id)
  const response = await api.post(`/api/job-applications/${id}/accept/`, application)
  return response.data
}

export const rejectJobApplication = async (id: number): Promise<JobApplicationRead> => {
  const application = await getJobApplicationById(id)
  const response = await api.post(`/api/job-applications/${id}/reject/`, application)
  return response.data
}

export const cancelJobApplication = async (id: number): Promise<JobApplicationRead> => {
  const application = await getJobApplicationById(id)
  const response = await api.post(`/api/job-applications/${id}/cancel/`, application)
  return response.data
}

// Icons
export const getIcons = async (search?: string): Promise<Icon[]> => {
  const params = { ...(search && { search }) }
  const response = await api.get("/api/jobs/icons/", { params })
  return response.data
}

export default api

