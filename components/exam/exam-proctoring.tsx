"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Camera, Mic, Monitor, Eye, AlertTriangle, Shield, Activity, Users, CheckCircle, XCircle } from "lucide-react"

interface ProctoringSession {
  studentId: string
  studentName: string
  examId: string
  startTime: Date
  status: "active" | "flagged" | "completed"
  violations: string[]
  confidenceScore: number
}

export function ExamProctoring() {
  const [sessions, setSessions] = useState<ProctoringSession[]>([
    {
      studentId: "STU001",
      studentName: "John Doe",
      examId: "exam_001",
      startTime: new Date(Date.now() - 30 * 60 * 1000),
      status: "active",
      violations: [],
      confidenceScore: 95,
    },
    {
      studentId: "STU002",
      studentName: "Jane Smith",
      examId: "exam_001",
      startTime: new Date(Date.now() - 45 * 60 * 1000),
      status: "flagged",
      violations: ["Multiple faces detected", "Tab switching"],
      confidenceScore: 72,
    },
    {
      studentId: "STU003",
      studentName: "Mike Johnson",
      examId: "exam_001",
      startTime: new Date(Date.now() - 60 * 60 * 1000),
      status: "active",
      violations: ["Audio anomaly"],
      confidenceScore: 88,
    },
  ])

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [aiAnalysis, setAiAnalysis] = useState({
    totalStudents: 45,
    activeNow: 32,
    flaggedSessions: 3,
    averageConfidence: 89,
  })

  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setSessions((prev) =>
        prev.map((session) => ({
          ...session,
          confidenceScore: Math.max(60, Math.min(100, session.confidenceScore + (Math.random() - 0.5) * 10)),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "flagged":
        return "bg-red-500"
      case "completed":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  const getConfidenceColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{aiAnalysis.totalStudents}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Students</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{aiAnalysis.activeNow}</div>
            <div className="text-sm text-green-700 dark:text-green-300">Active Now</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{aiAnalysis.flaggedSessions}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Flagged Sessions</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{aiAnalysis.averageConfidence}%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Sessions List */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Live Proctoring Sessions
              </CardTitle>
              <CardDescription>Real-time monitoring of active exam sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((session) => (
                  <Card
                    key={session.studentId}
                    className={`cursor-pointer transition-all ${
                      selectedStudent === session.studentId
                        ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedStudent(session.studentId)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5" />
                            </div>
                            <div
                              className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(session.status)} rounded-full border-2 border-white`}
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{session.studentName}</h4>
                            <p className="text-sm text-muted-foreground">ID: {session.studentId}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className={`text-sm font-medium ${getConfidenceColor(session.confidenceScore)}`}>
                              {session.confidenceScore}% confidence
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.floor((Date.now() - session.startTime.getTime()) / 60000)}m ago
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <Badge className={`${getStatusColor(session.status)} text-white text-xs`}>
                              {session.status}
                            </Badge>
                            {session.violations.length > 0 && (
                              <Badge variant="destructive" className="text-xs">
                                {session.violations.length} violations
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {session.violations.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <div className="flex flex-wrap gap-1">
                            {session.violations.map((violation, index) => (
                              <Badge key={index} variant="outline" className="text-xs text-red-600 border-red-200">
                                {violation}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Integrity Score</span>
                          <span>{session.confidenceScore}%</span>
                        </div>
                        <Progress value={session.confidenceScore} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed View */}
        <div className="space-y-6">
          {selectedStudent ? (
            <>
              {/* Live Feed */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Live Feed - {sessions.find((s) => s.studentId === selectedStudent)?.studentName}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <Camera className="h-8 w-8 text-gray-400" />
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>Live</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Camera className="h-3 w-3 text-green-500" />
                        <Mic className="h-3 w-3 text-green-500" />
                        <Monitor className="h-3 w-3 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Face Detection</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Eye Tracking</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Audio Analysis</span>
                      <XCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Screen Monitoring</span>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Send Warning
                  </Button>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Flag Session
                  </Button>
                  <Button size="sm" variant="destructive" className="w-full">
                    Terminate Exam
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium mb-2">Select a Student</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a student from the list to view their live proctoring feed and analysis.
                </p>
              </CardContent>
            </Card>
          )}

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">System Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>AI Processing</span>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Video Streams</span>
                <Badge className="bg-green-500 text-white">32/45 Active</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Storage</span>
                <Badge variant="outline">78% Used</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Network</span>
                <Badge className="bg-green-500 text-white">Stable</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Alerts */}
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          3 students have been flagged for suspicious activity. Review their sessions and take appropriate action.
        </AlertDescription>
      </Alert>
    </div>
  )
}
