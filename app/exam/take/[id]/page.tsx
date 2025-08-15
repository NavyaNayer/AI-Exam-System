import { ProtectedRoute } from "@/components/auth/protected-route"
import { ExamInterface } from "@/components/exam/exam-interface"

export default function TakeExamPage({ params }: { params: { id: string } }) {
  return (
    <ProtectedRoute requiredPermissions={["take_exams"]}>
      <ExamInterface />
    </ProtectedRoute>
  )
}
