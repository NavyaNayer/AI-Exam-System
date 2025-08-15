import { ProtectedRoute } from "@/components/auth/protected-route"
import { ExamSecurity } from "@/components/exam/exam-security"

export default function SecurityPage() {
  return (
    <ProtectedRoute requiredPermissions={["manage_system"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Exam Security</h1>
          <p className="text-muted-foreground">Configure security measures and monitoring settings</p>
        </div>
        <ExamSecurity />
      </div>
    </ProtectedRoute>
  )
}
