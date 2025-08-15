import { ProtectedRoute } from "@/components/auth/protected-route"
import { AISettings } from "@/components/ai/ai-settings"

export default function AISettingsPage() {
  return (
    <ProtectedRoute requiredPermissions={["manage_system"]}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">AI Configuration</h1>
          <p className="text-muted-foreground">Configure AI models and generation parameters</p>
        </div>
        <AISettings />
      </div>
    </ProtectedRoute>
  )
}
