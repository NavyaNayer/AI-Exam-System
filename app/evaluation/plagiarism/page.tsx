import { ProtectedRoute } from "@/components/auth/protected-route"
import { PlagiarismDetector } from "@/components/evaluation/plagiarism-detector"

export default function PlagiarismPage() {
  return (
    <ProtectedRoute requiredPermissions={["grade_exams"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Plagiarism Detection</h1>
          <p className="text-muted-foreground">AI-powered plagiarism detection and analysis</p>
        </div>
        <PlagiarismDetector />
      </div>
    </ProtectedRoute>
  )
}
