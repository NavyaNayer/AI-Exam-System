"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Shield, AlertTriangle, CheckCircle, Camera } from "lucide-react"

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [timeLeft, setTimeLeft] = useState(7200) // 2 hours in seconds
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isProctoring, setIsProctoring] = useState(true)
  const [securityAlerts, setSecurityAlerts] = useState(0)

  const questions = [
    {
      id: 1,
      type: "MCQ",
      question: "What is the derivative of x² + 3x + 2?",
      options: ["2x + 3", "x² + 3", "2x + 2", "x + 3"],
      marks: 2,
    },
    {
      id: 2,
      type: "Descriptive",
      question: "Explain the concept of limits in calculus and provide an example.",
      marks: 5,
    },
    {
      id: 3,
      type: "MCQ",
      question: "Which of the following is NOT a fundamental theorem of calculus?",
      options: [
        "First Fundamental Theorem",
        "Second Fundamental Theorem",
        "Third Fundamental Theorem",
        "Mean Value Theorem",
      ],
      marks: 2,
    },
  ]

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit exam
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Security monitoring simulation
  useEffect(() => {
    const securityCheck = setInterval(() => {
      // Simulate random security events
      if (Math.random() < 0.1) {
        setSecurityAlerts((prev) => prev + 1)
      }
    }, 10000)

    return () => clearInterval(securityCheck)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Security Header */}
      <div className="bg-red-600 text-white p-2 text-center text-sm">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Secure Exam Mode Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4" />
            <span>Proctoring: {isProctoring ? "ON" : "OFF"}</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Security Alerts: {securityAlerts}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Exam Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Mathematics Final Exam</h1>
            <p className="text-gray-600 dark:text-gray-300">Duration: 2 hours • Total Marks: 100</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Time Remaining</div>
            </div>
            <Button variant="destructive">Submit Exam</Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={currentQuestion === index ? "default" : answers[index + 1] ? "outline" : "ghost"}
                      size="sm"
                      className="aspect-square"
                      onClick={() => setCurrentQuestion(index)}
                    >
                      {index + 1}
                      {answers[index + 1] && <CheckCircle className="h-3 w-3 ml-1" />}
                    </Button>
                  ))}
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-primary rounded"></div>
                    <span>Current</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-gray-300 rounded"></div>
                    <span>Answered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                    <span>Not Visited</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Status */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Camera</span>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Screen Recording</span>
                  <Badge variant="outline" className="text-green-600">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Tab Switching</span>
                  <Badge variant="outline" className="text-red-600">
                    Blocked
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Copy/Paste</span>
                  <Badge variant="outline" className="text-red-600">
                    Disabled
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Current Question */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">Question {currentQuestion + 1}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{questions[currentQuestion].type}</Badge>
                    <Badge variant="outline">{questions[currentQuestion].marks} marks</Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium text-gray-900 dark:text-white">
                  {questions[currentQuestion].question}
                </div>

                {questions[currentQuestion].type === "MCQ" && questions[currentQuestion].options && (
                  <RadioGroup
                    value={answers[questions[currentQuestion].id] || ""}
                    onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
                  >
                    {questions[currentQuestion].options!.map((option, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          <span className="font-medium mr-2">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}

                {questions[currentQuestion].type === "Descriptive" && (
                  <div className="space-y-2">
                    <Label htmlFor="answer">Your Answer:</Label>
                    <Textarea
                      id="answer"
                      placeholder="Type your detailed answer here..."
                      rows={8}
                      value={answers[questions[currentQuestion].id] || ""}
                      onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                    />
                    <div className="text-sm text-gray-500">
                      Word count:{" "}
                      {
                        (answers[questions[currentQuestion].id] || "").split(" ").filter((word) => word.length > 0)
                          .length
                      }
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline">Clear Response</Button>
                    <Button variant="outline">Mark for Review</Button>
                  </div>

                  <Button
                    onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    disabled={currentQuestion === questions.length - 1}
                  >
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
