// Generated types from the OpenAPI schema

export type StatusEnum = "PENDING" | "CANCELLED" | "APPROVED" | "REJECTED"

export interface Icon {
  id: number
  name: string
  image?: string
}

export interface User {
  id: number
  phone_number: string
  profile_image?: string
  first_name?: string
  last_name?: string
  is_active: boolean
  date_joined: string
}

export interface PatchedUser {
  phone_number?: string
  profile_image?: string
  first_name?: string
  last_name?: string
}

export interface Login {
  phone_number: string
}

export interface OTP {
  phone_number: string
  otp_code: string
}

export interface JobRead {
  icon: Icon
  images: string
  title: string
  description: string
  address: string
  requirements: string
  lat: number
  lng: number
  cost: number
  duration: number
  user: number
}

export interface PatchedJobCreateUpdate {
  icon?: number
  title?: string
  images?: string[]
  description?: string
  address?: string
  requirements?: string
  lat?: number
  lng?: number
  cost?: number
  duration?: number
}

export interface JobApplicationRead {
  id: number
  job: number
  user: number
  status: StatusEnum
  user_cost?: number
  comment?: string
}

export interface JobApplicationCreate {
  job: number
  user_cost?: number
  comment?: string
}

export interface PaginatedJobReadList {
  count: number
  next?: string
  previous?: string
  results: JobRead[]
}

