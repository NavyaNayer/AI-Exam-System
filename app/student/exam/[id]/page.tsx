"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, Camera, Shield, Eye } from "lucide-react"
import Link from "next/link"

export default function ExamPage({ params }: { params: { id: string } }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(7200) // 2 hours in seconds
  const [isProctoring, setIsProctoring] = useState(true)

  const questions = [
    {
      id: 1,
      type: "mcq",
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      marks: 2,
    },
    {
      id: 2,
      type: "mcq",
      question: "Which data structure uses LIFO principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
      marks: 2,
    },
    {
      id: 3,
      type: "descriptive",
      question: "Explain the difference between stack and queue data structures with examples.",
      marks: 10,
    },
    {
      id: 4,
      type: "mcq",
      question: "What is the worst-case time complexity of quicksort?",
      options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
      marks: 2,
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Auto-submit when time runs out
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
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
        <div className="flex items-center justify-center gap-2">
          <Shield className="h-4 w-4" />
          SECURE EXAM MODE - Do not switch tabs or applications
          <Eye className="h-4 w-4" />
          Proctoring Active
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Exam Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Data Structures Exam</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <Clock className="h-4 w-4 mr-2" />
              {formatTime(timeLeft)}
            </Badge>
            {isProctoring && (
              <Badge variant="destructive" className="px-3 py-1">
                <Camera className="h-4 w-4 mr-2" />
                Recording
              </Badge>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <Progress value={progress} className="mb-2" />
          <p className="text-sm text-gray-600 dark:text-gray-400">Progress: {Math.round(progress)}% complete</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Panel */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Question {currentQuestion + 1}</span>
                  <Badge variant="secondary">{questions[currentQuestion].marks} marks</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-lg font-medium">{questions[currentQuestion].question}</div>

                {questions[currentQuestion].type === "mcq" ? (
                  <RadioGroup
                    value={answers[questions[currentQuestion].id] || ""}
                    onValueChange={(value) => handleAnswerChange(questions[currentQuestion].id, value)}
                  >
                    {questions[currentQuestion].options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Textarea
                    placeholder="Type your answer here..."
                    value={answers[questions[currentQuestion].id] || ""}
                    onChange={(e) => handleAnswerChange(questions[currentQuestion].id, e.target.value)}
                    className="min-h-[200px]"
                  />
                )}

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>
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

          {/* Navigation Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Question Navigator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-2">
                  {questions.map((_, index) => (
                    <Button
                      key={index}
                      variant={
                        currentQuestion === index ? "default" : answers[questions[index].id] ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setCurrentQuestion(index)}
                      className="aspect-square"
                    >
                      {index + 1}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Exam Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span>
                    {Object.keys(answers).length}/{questions.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span>{questions.length - Object.keys(answers).length}</span>
                </div>
                <Button asChild className="w-full" size="lg">
                  <Link href="/student/exam/submit">Submit Exam</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-900/20">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-orange-800 dark:text-orange-200">Security Notice</p>
                    <p className="text-orange-700 dark:text-orange-300">
                      Your screen is being monitored. Switching tabs will be flagged.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
