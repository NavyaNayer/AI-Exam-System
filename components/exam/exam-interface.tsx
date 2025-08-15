"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Clock, Shield, Eye, AlertTriangle, Camera, Mic, Monitor, Lock, Save, Send, Flag } from "lucide-react"

interface Question {
  id: string
  type: "mcq" | "descriptive" | "numerical" | "true-false"
  question: string
  options?: string[]
  timeLimit?: number
  points: number
}

interface ExamSession {
  id: string
  title: string
  duration: number
  questions: Question[]
  startTime: Date
  endTime: Date
  allowedAttempts: number
  currentAttempt: number
}

export function ExamInterface() {
  const [examSession] = useState<ExamSession>({
    id: "exam_001",
    title: "Data Structures and Algorithms - Midterm",
    duration: 120, // minutes
    questions: [
      {
        id: "q1",
        type: "mcq",
        question: "What is the time complexity of inserting an element at the beginning of a linked list?",
        options: [
          "O(1) - Constant time",
          "O(n) - Linear time",
          "O(log n) - Logarithmic time",
          "O(n²) - Quadratic time",
        ],
        points: 5,
      },
      {
        id: "q2",
        type: "descriptive",
        question:
          "Explain the difference between a stack and a queue. Provide examples of real-world applications for each.",
        points: 10,
      },
      {
        id: "q3",
        type: "numerical",
        question: "If a binary tree has 15 nodes, what is the minimum possible height of the tree?",
        points: 5,
      },
    ],
    startTime: new Date(),
    endTime: new Date(Date.now() + 120 * 60 * 1000),
    allowedAttempts: 1,
    currentAttempt: 1,
  })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [timeRemaining, setTimeRemaining] = useState(120 * 60) // seconds
  const [isProctoring, setIsProctoring] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState<string[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [tabSwitches, setTabSwitches] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const videoRef = useRef<HTMLVideoElement>(null)
  const examContainerRef = useRef<HTMLDivElement>(null)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Security monitoring
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitches((prev) => prev + 1)
        setSecurityAlerts((prev) => [...prev, `Tab switch detected at ${new Date().toLocaleTimeString()}`])
      }
    }

    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement
      setIsFullscreen(isCurrentlyFullscreen)
      if (!isCurrentlyFullscreen) {
        setSecurityAlerts((prev) => [...prev, `Fullscreen mode exited at ${new Date().toLocaleTimeString()}`])
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent common cheating shortcuts
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "v" || e.key === "a" || e.key === "f")) ||
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && e.key === "I")
      ) {
        e.preventDefault()
        setSecurityAlerts((prev) => [...prev, `Blocked shortcut: ${e.key} at ${new Date().toLocaleTimeString()}`])
      }
    }

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      setSecurityAlerts((prev) => [...prev, `Right-click blocked at ${new Date().toLocaleTimeString()}`])
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  // Initialize camera for proctoring
  useEffect(() => {
    if (isProctoring && videoRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("Error accessing camera:", err)
          setSecurityAlerts((prev) => [...prev, "Camera access denied - exam may be flagged"])
        })
    }
  }, [isProctoring])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < examSession.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const handleSaveProgress = async () => {
    // Simulate saving progress
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  const handleAutoSubmit = async () => {
    setIsSubmitting(true)
    // Auto-submit when time runs out
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Exam auto-submitted due to time limit")
  }

  const handleManualSubmit = async () => {
    setIsSubmitting(true)
    // Manual submission
    await new Promise((resolve) => setTimeout(resolve, 2000))
    alert("Exam submitted successfully")
  }

  const enterFullscreen = () => {
    if (examContainerRef.current) {
      examContainerRef.current.requestFullscreen()
    }
  }

  const currentQuestion = examSession.questions[currentQuestionIndex]
  const progress = ((currentQuestionIndex + 1) / examSession.questions.length) * 100
  const answeredQuestions = Object.keys(answers).length

  return (
    <div ref={examContainerRef} className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Security Header */}
      <div className="bg-red-600 text-white p-2 text-center text-sm font-medium">
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-4 w-4" />
          SECURE EXAM MODE - Do not leave this page or switch tabs
        </div>
      </div>

      {/* Exam Header */}
      <div className="bg-white dark:bg-gray-800 border-b p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">{examSession.title}</h1>
            <p className="text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {examSession.questions.length}
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div className="flex items-center gap-2">
              <Clock className={`h-5 w-5 ${timeRemaining < 600 ? "text-red-500" : "text-blue-500"}`} />
              <span className={`font-mono text-lg ${timeRemaining < 600 ? "text-red-500" : "text-foreground"}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>

            {/* Security Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Camera className="h-4 w-4 text-green-500" />
                <Mic className="h-4 w-4 text-green-500" />
                <Monitor className="h-4 w-4 text-green-500" />
              </div>
              <Badge variant={securityAlerts.length > 0 ? "destructive" : "default"}>
                {securityAlerts.length > 0 ? `${securityAlerts.length} Alerts` : "Secure"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Exam Area */}
          <div className="lg:col-span-3 space-y-6">
            {/* Progress */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">
                    {answeredQuestions}/{examSession.questions.length} answered
                  </span>
                </div>
                <Progress value={progress} className="w-full" />
              </CardContent>
            </Card>

            {/* Question */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">
                    Question {currentQuestionIndex + 1}
                    <Badge className="ml-2" variant="outline">
                      {currentQuestion.points} points
                    </Badge>
                  </CardTitle>
                  <Badge variant="secondary">{currentQuestion.type.toUpperCase()}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base leading-relaxed">{currentQuestion.question}</p>

                {/* MCQ Options */}
                {currentQuestion.type === "mcq" && currentQuestion.options && (
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                          className="mt-1"
                        />
                        <span className="flex-1">{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {/* Descriptive Answer */}
                {currentQuestion.type === "descriptive" && (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="min-h-[200px]"
                  />
                )}

                {/* Numerical Answer */}
                {currentQuestion.type === "numerical" && (
                  <input
                    type="number"
                    placeholder="Enter your numerical answer"
                    value={answers[currentQuestion.id] || ""}
                    onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                    className="w-full p-3 border rounded-lg"
                  />
                )}

                {/* True/False */}
                {currentQuestion.type === "true-false" && (
                  <div className="space-y-3">
                    {["True", "False"].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                      >
                        <input
                          type="radio"
                          name={`question_${currentQuestion.id}`}
                          value={option}
                          checked={answers[currentQuestion.id] === option}
                          onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={handlePreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="bg-transparent"
              >
                Previous
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={handleSaveProgress}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Save className="h-4 w-4" />
                  Save Progress
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Flag className="h-4 w-4" />
                  Flag for Review
                </Button>
              </div>

              {currentQuestionIndex === examSession.questions.length - 1 ? (
                <Button onClick={handleManualSubmit} disabled={isSubmitting} className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Submitting..." : "Submit Exam"}
                </Button>
              ) : (
                <Button onClick={handleNextQuestion}>Next</Button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Proctoring */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Proctoring Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-24 bg-gray-200 dark:bg-gray-700 rounded object-cover"
                  />
                  <div className="text-xs text-muted-foreground">
                    Your activity is being monitored for exam integrity
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Navigator */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {examSession.questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={index === currentQuestionIndex ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentQuestionIndex(index)}
                      className={`h-8 w-8 p-0 ${
                        answers[examSession.questions[index].id]
                          ? "bg-green-100 border-green-300 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-200"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Security Alerts */}
            {securityAlerts.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Security Alerts ({securityAlerts.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {securityAlerts.slice(-5).map((alert, index) => (
                      <div
                        key={index}
                        className="text-xs p-2 bg-red-50 dark:bg-red-900/20 rounded text-red-700 dark:text-red-300"
                      >
                        {alert}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Exam Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Exam Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{examSession.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Questions:</span>
                  <span>{examSession.questions.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Attempt:</span>
                  <span>
                    {examSession.currentAttempt}/{examSession.allowedAttempts}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tab Switches:</span>
                  <span className={tabSwitches > 0 ? "text-red-500" : ""}>{tabSwitches}</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Actions */}
            {!isFullscreen && (
              <Alert>
                <Lock className="h-4 w-4" />
                <AlertDescription>
                  <div className="space-y-2">
                    <p className="text-sm">For exam security, please enable fullscreen mode.</p>
                    <Button size="sm" onClick={enterFullscreen} className="w-full">
                      Enter Fullscreen
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
