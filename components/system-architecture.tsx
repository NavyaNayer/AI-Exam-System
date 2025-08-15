import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Database, Shield, Users, Monitor, Cloud, Lock, Zap } from "lucide-react"

export function SystemArchitecture() {
  const layers = [
    {
      name: "Presentation Layer",
      icon: Monitor,
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      components: [
        "Multi-Device Web Interface",
        "Mobile-Responsive Design",
        "Real-time Exam Dashboard",
        "Progressive Web App (PWA)",
      ],
    },
    {
      name: "Authentication & Authorization",
      icon: Shield,
      color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      components: [
        "Role-Based Access Control (RBAC)",
        "Multi-Factor Authentication",
        "Session Management",
        "JWT Token Security",
      ],
    },
    {
      name: "AI Processing Layer",
      icon: Brain,
      color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      components: [
        "Question Generation Engine",
        "Automated Evaluation System",
        "Plagiarism Detection",
        "Performance Analytics",
      ],
    },
    {
      name: "Business Logic Layer",
      icon: Zap,
      color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
      components: ["Exam Management System", "Question Bank Management", "Result Processing", "Notification Service"],
    },
    {
      name: "Data Layer",
      icon: Database,
      color: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      components: [
        "Encrypted Database Storage",
        "Question Bank Repository",
        "User Data Management",
        "Audit Trail Logging",
      ],
    },
    {
      name: "Infrastructure Layer",
      icon: Cloud,
      color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
      components: ["Cloud Hosting Platform", "Load Balancing", "Backup & Recovery", "Monitoring & Alerts"],
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-600" />
            System Architecture Overview
          </CardTitle>
          <CardDescription>Layered architecture ensuring scalability, security, and maintainability</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {layers.map((layer, index) => {
              const IconComponent = layer.icon
              return (
                <Card key={index} className="relative">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${layer.color}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <CardTitle className="text-lg">{layer.name}</CardTitle>
                      </div>
                      <Badge variant="outline">Layer {index + 1}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {layer.components.map((component, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <div className="h-1.5 w-1.5 bg-current rounded-full" />
                          {component}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Security First
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              End-to-end encryption, secure authentication, and tamper-proof exam delivery
            </p>
          </CardContent>
        </Card>

        <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-green-800 dark:text-green-200 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Role Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 dark:text-green-300">
              Granular permissions for administrators, faculty, and students with audit trails
            </p>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-purple-800 dark:text-purple-200 flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Multi-Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              Responsive design supporting desktops, tablets, and smartphones seamlessly
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
