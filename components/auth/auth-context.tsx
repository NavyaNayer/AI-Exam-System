"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"

export type UserRole = "admin" | "faculty" | "student"

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: UserRole
  studentId?: string
  department?: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  hasPermission: (permission: string) => boolean
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  studentId: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Role-based permissions
  const permissions = {
    admin: ["manage_users", "manage_system", "view_analytics", "manage_exams", "grade_exams", "take_exams"],
    faculty: ["manage_exams", "grade_exams", "view_student_results", "create_questions"],
    student: ["take_exams", "view_results", "view_profile"],
  }

  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Mock user data based on role
      const mockUser: User = {
        id: `${role}_${Date.now()}`,
        email,
        firstName: role === "admin" ? "Admin" : role === "faculty" ? "Dr. Jane" : "John",
        lastName: role === "admin" ? "User" : role === "faculty" ? "Smith" : "Doe",
        role,
        studentId: role === "student" ? "STU001" : role === "faculty" ? "FAC001" : undefined,
        department: role !== "admin" ? "Computer Science" : undefined,
      }

      setUser(mockUser)
      localStorage.setItem("user", JSON.stringify(mockUser))
    } catch (error) {
      throw new Error("Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const register = async (userData: RegisterData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const newUser: User = {
        id: `${userData.role}_${Date.now()}`,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role,
        studentId: userData.studentId,
        department: "Computer Science",
      }

      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      throw new Error("Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return permissions[user.role]?.includes(permission) || false
  }

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem("user")
      }
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        hasPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
