import { ProtectedRoute } from "@/components/auth/protected-route"
import { QuestionGenerator } from "@/components/ai/question-generator"

export default function GeneratePage() {
  return (
    <ProtectedRoute requiredPermissions={["create_questions"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Question Generator</h1>
          <p className="text-muted-foreground">Create high-quality questions using advanced AI models</p>
        </div>
        <QuestionGenerator />
      </div>
    </ProtectedRoute>
  )
}
