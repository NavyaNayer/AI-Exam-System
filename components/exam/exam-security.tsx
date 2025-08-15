"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Settings,
  Monitor,
  Camera,
  Mic,
  Wifi,
  Database,
  Key,
} from "lucide-react"

export function ExamSecurity() {
  const [securitySettings, setSecuritySettings] = useState({
    fullscreenRequired: true,
    tabSwitchingBlocked: true,
    rightClickDisabled: true,
    copyPasteBlocked: true,
    screenshotBlocked: true,
    cameraRequired: true,
    microphoneRequired: true,
    faceDetection: true,
    eyeTracking: true,
    audioAnalysis: true,
    networkMonitoring: true,
    encryptionEnabled: true,
  })

  const [securityMetrics] = useState({
    totalExams: 156,
    secureExams: 152,
    flaggedSessions: 8,
    blockedAttempts: 23,
    integrityScore: 97.4,
  })

  const handleSettingChange = (setting: string, value: boolean) => {
    setSecuritySettings((prev) => ({ ...prev, [setting]: value }))
  }

  const securityFeatures = [
    {
      id: "fullscreenRequired",
      title: "Fullscreen Mode Required",
      description: "Force students to remain in fullscreen mode during exams",
      icon: Monitor,
      category: "display",
    },
    {
      id: "tabSwitchingBlocked",
      title: "Tab Switching Detection",
      description: "Detect and prevent switching to other browser tabs",
      icon: AlertTriangle,
      category: "display",
    },
    {
      id: "rightClickDisabled",
      title: "Right-Click Disabled",
      description: "Disable context menu and right-click functionality",
      icon: Lock,
      category: "input",
    },
    {
      id: "copyPasteBlocked",
      title: "Copy/Paste Blocked",
      description: "Prevent copying and pasting text during exams",
      icon: Shield,
      category: "input",
    },
    {
      id: "screenshotBlocked",
      title: "Screenshot Prevention",
      description: "Block screenshot attempts and screen recording",
      icon: Camera,
      category: "input",
    },
    {
      id: "cameraRequired",
      title: "Camera Access Required",
      description: "Require camera access for visual proctoring",
      icon: Camera,
      category: "proctoring",
    },
    {
      id: "microphoneRequired",
      title: "Microphone Access Required",
      description: "Require microphone access for audio monitoring",
      icon: Mic,
      category: "proctoring",
    },
    {
      id: "faceDetection",
      title: "Face Detection",
      description: "AI-powered face detection and recognition",
      icon: Eye,
      category: "ai",
    },
    {
      id: "eyeTracking",
      title: "Eye Tracking",
      description: "Monitor eye movement and attention patterns",
      icon: Eye,
      category: "ai",
    },
    {
      id: "audioAnalysis",
      title: "Audio Analysis",
      description: "Analyze audio for suspicious sounds or voices",
      icon: Mic,
      category: "ai",
    },
    {
      id: "networkMonitoring",
      title: "Network Monitoring",
      description: "Monitor network activity for unauthorized access",
      icon: Wifi,
      category: "network",
    },
    {
      id: "encryptionEnabled",
      title: "End-to-End Encryption",
      description: "Encrypt all exam data and communications",
      icon: Key,
      category: "encryption",
    },
  ]

  const getFeaturesByCategory = (category: string) => {
    return securityFeatures.filter((feature) => feature.category === category)
  }

  const categories = [
    { id: "display", name: "Display Control", icon: Monitor },
    { id: "input", name: "Input Control", icon: Lock },
    { id: "proctoring", name: "Proctoring", icon: Camera },
    { id: "ai", name: "AI Monitoring", icon: Eye },
    { id: "network", name: "Network Security", icon: Wifi },
    { id: "encryption", name: "Data Security", icon: Key },
  ]

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{securityMetrics.totalExams}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Exams</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{securityMetrics.secureExams}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Secure Exams</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{securityMetrics.flaggedSessions}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Flagged Sessions</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{securityMetrics.blockedAttempts}</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">Blocked Attempts</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{securityMetrics.integrityScore}%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Integrity Score</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            Security Configuration
          </CardTitle>
          <CardDescription>Configure security measures and monitoring settings for exams</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="features">Security Features</TabsTrigger>
              <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
              <TabsTrigger value="reports">Security Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="space-y-6">
              <div className="space-y-6">
                {categories.map((category) => {
                  const CategoryIcon = category.icon
                  const features = getFeaturesByCategory(category.id)

                  return (
                    <Card key={category.id}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <CategoryIcon className="h-5 w-5" />
                          {category.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {features.map((feature) => {
                            const FeatureIcon = feature.icon
                            return (
                              <div key={feature.id} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center gap-3">
                                  <FeatureIcon className="h-5 w-5 text-muted-foreground" />
                                  <div>
                                    <h4 className="font-medium">{feature.title}</h4>
                                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                                  </div>
                                </div>
                                <Switch
                                  checked={securitySettings[feature.id as keyof typeof securitySettings]}
                                  onCheckedChange={(checked) => handleSettingChange(feature.id, checked)}
                                />
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="monitoring" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardHeader>
                    <CardTitle className="text-green-800 dark:text-green-200">Active Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Camera Feeds</span>
                      <Badge className="bg-green-500 text-white">32 Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Audio Monitoring</span>
                      <Badge className="bg-green-500 text-white">Online</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Screen Monitoring</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AI Analysis</span>
                      <Badge className="bg-green-500 text-white">Running</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-red-50 dark:bg-red-900/20">
                  <CardHeader>
                    <CardTitle className="text-red-800 dark:text-red-200">Security Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm p-2 bg-red-100 dark:bg-red-900/30 rounded">
                      <strong>High Priority:</strong> Multiple faces detected - Student ID: STU002
                    </div>
                    <div className="text-sm p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded">
                      <strong>Medium:</strong> Tab switching detected - Student ID: STU007
                    </div>
                    <div className="text-sm p-2 bg-orange-100 dark:bg-orange-900/30 rounded">
                      <strong>Low:</strong> Audio anomaly detected - Student ID: STU015
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  All security events are logged and can be reviewed for detailed analysis and reporting.
                </AlertDescription>
              </Alert>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Daily Security Report</h3>
                    <p className="text-2xl font-bold text-blue-600">97.4%</p>
                    <p className="text-sm text-muted-foreground">Integrity Score</p>
                    <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                      View Report
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">Violation Summary</h3>
                    <p className="text-2xl font-bold text-red-600">8</p>
                    <p className="text-sm text-muted-foreground">Total Violations</p>
                    <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                      View Details
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="font-semibold mb-2">System Performance</h3>
                    <p className="text-2xl font-bold text-green-600">99.2%</p>
                    <p className="text-sm text-muted-foreground">Uptime</p>
                    <Button size="sm" variant="outline" className="mt-3 bg-transparent">
                      View Metrics
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
