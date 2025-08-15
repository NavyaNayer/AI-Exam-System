import { ProtectedRoute } from "@/components/auth/protected-route"
import { AIGrader } from "@/components/evaluation/ai-grader"

export default function GradePage() {
  return (
    <ProtectedRoute requiredPermissions={["grade_exams"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI-Powered Grading</h1>
          <p className="text-muted-foreground">Automated evaluation with AI analysis and manual review</p>
        </div>
        <AIGrader />
      </div>
    </ProtectedRoute>
  )
}
