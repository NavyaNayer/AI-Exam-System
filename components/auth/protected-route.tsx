"use client"

import type React from "react"

import { useAuth } from "./auth-context"
import { LoginForm } from "./login-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredPermissions?: string[]
  fallback?: React.ReactNode
}

export function ProtectedRoute({ children, requiredPermissions = [], fallback }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!user) {
    return fallback || <LoginForm />
  }

  // Check permissions
  if (requiredPermissions.length > 0) {
    const hasAllPermissions = requiredPermissions.every((permission) => {
      const permissions = {
        admin: ["manage_users", "manage_system", "view_analytics", "manage_exams", "grade_exams", "take_exams"],
        faculty: ["manage_exams", "grade_exams", "view_student_results", "create_questions"],
        student: ["take_exams", "view_results", "view_profile"],
      }
      return permissions[user.role]?.includes(permission) || false
    })

    if (!hasAllPermissions) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-red-500 mx-auto mb-2" />
              <CardTitle>Access Denied</CardTitle>
              <CardDescription>You don't have permission to access this resource</CardDescription>
            </CardHeader>
            <CardContent>
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Your role ({user.role}) doesn't have the required permissions: {requiredPermissions.join(", ")}
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      )
    }
  }

  return <>{children}</>
}
