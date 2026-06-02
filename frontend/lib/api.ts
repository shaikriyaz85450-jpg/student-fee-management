"use client"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1"
const TOKEN_KEY = "edufee_access_token"
const USER_KEY = "edufee_user"

type ApiOptions = RequestInit & {
  auth?: boolean
}

export type AuthRole = "STUDENT" | "FACULTY" | "ACCOUNTANT"

export function getAccessToken() {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_KEY)
}

export function getStoredUser<T = any>() {
  if (typeof window === "undefined") return null
  const raw = window.localStorage.getItem(USER_KEY)
  return raw ? (JSON.parse(raw) as T) : null
}

export function setSession(accessToken: string, user: unknown) {
  window.localStorage.setItem(TOKEN_KEY, accessToken)
  window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  document.cookie = `${TOKEN_KEY}=${accessToken}; path=/; max-age=86400; SameSite=Lax`
  document.cookie = `edufee_role=${(user as any).role}; path=/; max-age=86400; SameSite=Lax`
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.localStorage.removeItem(USER_KEY)
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`
  document.cookie = "edufee_role=; path=/; max-age=0"
}

export async function apiRequest<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const headers = new Headers(options.headers)
  const isFormData = options.body instanceof FormData

  if (!isFormData && options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (options.auth !== false) {
    const token = getAccessToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  })

  if (response.status === 204) return undefined as T

  const payload = await response.json().catch(() => null)

  if (!response.ok || payload?.success === false) {
    // If the backend provides validation details (Zod issues), include them in the error message
    let errorMessage = payload?.message || payload?.error || "Request failed"
    if (payload?.details && Array.isArray(payload.details)) {
      try {
        const detailMsgs = payload.details.map((d: any) => {
          if (d.path && d.message) return `${d.path.join('.')}: ${d.message}`
          return d.message || JSON.stringify(d)
        })
        if (detailMsgs.length) errorMessage = `${errorMessage}: ${detailMsgs.join('; ')}`
      } catch (e) {
        // ignore formatting errors
      }
    }

    throw new Error(errorMessage)
  }

  return payload as T
}

export async function login(identifier: string, password: string, role: AuthRole) {
  const response = await apiRequest<{
    success: true
    data: { accessToken: string; user: any }
  }>("/auth/login", {
    method: "POST",
    auth: false,
    body: JSON.stringify({ identifier, password, role }),
  })

  setSession(response.data.accessToken, response.data.user)
  return response.data.user
}

export async function registerUser(payload: {
  name: string
  email: string
  password: string
  role: AuthRole
  department?: string
  rollNumber?: string
  semester?: number
}) {
  const response = await apiRequest<{ success: true; data: any }>("/auth/register", {
    method: "POST",
    auth: false,
    body: JSON.stringify(payload),
  })

  return response.data
}

export async function updateProfile(payload: any) {
  const response = await apiRequest<{ success: true; data: any }>("/auth/profile", {
    method: "PUT",
    body: JSON.stringify(payload),
  })

  setSession(getAccessToken()!, response.data)
  return response.data
}
