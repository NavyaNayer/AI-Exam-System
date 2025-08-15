import { ProtectedRoute } from "@/components/auth/protected-route"
import { ExamProctoring } from "@/components/exam/exam-proctoring"

export default function ProctorPage() {
  return (
    <ProtectedRoute requiredPermissions={["grade_exams"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Live Proctoring</h1>
          <p className="text-muted-foreground">Monitor active exam sessions in real-time</p>
        </div>
        <ExamProctoring />
      </div>
    </ProtectedRoute>
  )
}
