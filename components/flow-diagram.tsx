import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowDown, Brain, Database, Shield, FileText, CheckCircle, Settings } from "lucide-react"

export function FlowDiagram() {
  const phases = [
    {
      title: "Pre-Exam Setup",
      icon: Settings,
      color: "bg-blue-500",
      steps: [
        { text: "Admin creates exam configuration", actor: "Administrator" },
        { text: "AI generates question variations", actor: "AI System", ai: true },
        { text: "Faculty reviews and approves questions", actor: "Faculty" },
        { text: "System encrypts and stores question bank", actor: "System" },
      ],
    },
    {
      title: "Authentication & Access",
      icon: Shield,
      color: "bg-green-500",
      steps: [
        { text: "Student/Faculty login with MFA", actor: "User" },
        { text: "System validates credentials and role", actor: "Auth System" },
        { text: "Access permissions verified", actor: "RBAC System" },
        { text: "Secure session established", actor: "System" },
      ],
    },
    {
      title: "Exam Delivery",
      icon: FileText,
      color: "bg-purple-500",
      steps: [
        { text: "AI selects personalized question set", actor: "AI System", ai: true },
        { text: "Questions delivered via secure channel", actor: "System" },
        { text: "Real-time monitoring activated", actor: "Proctoring System" },
        { text: "Student completes exam digitally", actor: "Student" },
      ],
    },
    {
      title: "AI Evaluation",
      icon: Brain,
      color: "bg-orange-500",
      steps: [
        { text: "AI analyzes submitted answers", actor: "AI System", ai: true },
        { text: "Automated scoring with confidence levels", actor: "AI System", ai: true },
        { text: "Plagiarism detection performed", actor: "AI System", ai: true },
        { text: "Results flagged for manual review if needed", actor: "System" },
      ],
    },
    {
      title: "Results & Analytics",
      icon: CheckCircle,
      color: "bg-teal-500",
      steps: [
        { text: "Faculty reviews AI-generated results", actor: "Faculty" },
        { text: "Final grades approved and published", actor: "Faculty" },
        { text: "AI generates performance analytics", actor: "AI System", ai: true },
        { text: "Reports delivered to stakeholders", actor: "System" },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple-600" />
            System Flow Diagram
          </CardTitle>
          <CardDescription>End-to-end process flow from exam creation to result delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {phases.map((phase, phaseIndex) => {
              const IconComponent = phase.icon
              return (
                <div key={phaseIndex} className="relative">
                  {/* Phase Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-lg ${phase.color} text-white`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{phase.title}</h3>
                      <Badge variant="outline">Phase {phaseIndex + 1}</Badge>
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="ml-8 space-y-4">
                    {phase.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                              step.ai ? "bg-purple-500" : "bg-gray-400"
                            }`}
                          >
                            {stepIndex + 1}
                          </div>
                          {stepIndex < phase.steps.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-300 dark:bg-gray-600 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{step.text}</p>
                            {step.ai && (
                              <Badge
                                variant="secondary"
                                className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                              >
                                <Brain className="h-3 w-3 mr-1" />
                                AI
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Actor: {step.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Arrow to next phase */}
                  {phaseIndex < phases.length - 1 && (
                    <div className="flex justify-center my-6">
                      <ArrowDown className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Data Flow Diagram */}
      <Card>
        <CardHeader>
          <CardTitle>Data Flow Architecture</CardTitle>
          <CardDescription>How information flows through the system components</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-50 dark:bg-blue-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Sources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">• Question Banks</div>
                <div className="text-sm">• User Profiles</div>
                <div className="text-sm">• Exam Configurations</div>
                <div className="text-sm">• Historical Data</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-50 dark:bg-purple-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Processing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">• Question Generation</div>
                <div className="text-sm">• Answer Evaluation</div>
                <div className="text-sm">• Plagiarism Detection</div>
                <div className="text-sm">• Analytics Generation</div>
              </CardContent>
            </Card>

            <Card className="bg-green-50 dark:bg-green-900/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Outputs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">• Personalized Exams</div>
                <div className="text-sm">• Automated Scores</div>
                <div className="text-sm">• Performance Reports</div>
                <div className="text-sm">• Security Alerts</div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
