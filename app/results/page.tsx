"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Brain, AlertTriangle, TrendingUp, Award } from "lucide-react"
import Link from "next/link"

export default function ResultsPage() {
  const [selectedExam, setSelectedExam] = useState("math-final")

  const examResults = {
    "math-final": {
      title: "Mathematics Final Exam",
      score: 85,
      maxScore: 100,
      grade: "A",
      rank: 12,
      totalStudents: 156,
      aiConfidence: 94,
      plagiarismScore: 2,
      timeSpent: "1h 45m",
      submittedAt: "2024-01-15 14:30",
      questions: [
        {
          id: 1,
          question: "Derivative of x² + 3x + 2",
          yourAnswer: "2x + 3",
          correctAnswer: "2x + 3",
          marks: 2,
          obtained: 2,
          aiConfidence: 98,
        },
        {
          id: 2,
          question: "Explain limits in calculus",
          yourAnswer: "A limit describes the value that a function approaches...",
          correctAnswer: "Detailed explanation expected",
          marks: 5,
          obtained: 4,
          aiConfidence: 87,
        },
        {
          id: 3,
          question: "Fundamental theorem identification",
          yourAnswer: "Third Fundamental Theorem",
          correctAnswer: "Third Fundamental Theorem",
          marks: 2,
          obtained: 2,
          aiConfidence: 95,
        },
      ],
    },
  }

  const currentResult = examResults[selectedExam as keyof typeof examResults]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-600" />
              Exam Results & Analytics
            </h1>
            <p className="text-gray-600 dark:text-gray-300">AI-powered evaluation with detailed insights</p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        {/* Exam Selector */}
        <div className="mb-6">
          <Select value={selectedExam} onValueChange={setSelectedExam}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="math-final">Mathematics Final Exam</SelectItem>
              <SelectItem value="physics-mid">Physics Midterm</SelectItem>
              <SelectItem value="chemistry-quiz">Chemistry Quiz</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Score</CardTitle>
              <Award className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {currentResult.score}/{currentResult.maxScore}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-green-600">
                  Grade {currentResult.grade}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentResult.rank}</div>
              <p className="text-xs text-muted-foreground">out of {currentResult.totalStudents} students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Confidence</CardTitle>
              <Brain className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentResult.aiConfidence}%</div>
              <p className="text-xs text-muted-foreground">Evaluation accuracy</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Plagiarism Score</CardTitle>
              <AlertTriangle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentResult.plagiarismScore}%</div>
              <p className="text-xs text-muted-foreground">Very low risk</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Results */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="questions">Question Analysis</TabsTrigger>
            <TabsTrigger value="ai-feedback">AI Feedback</TabsTrigger>
            <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Overall Score</span>
                      <span>
                        {currentResult.score}/{currentResult.maxScore}
                      </span>
                    </div>
                    <Progress value={(currentResult.score / currentResult.maxScore) * 100} className="h-2" />
                  </div>

                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between">
                      <span className="text-sm">Multiple Choice</span>
                      <span className="text-sm font-medium">4/4 (100%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Descriptive</span>
                      <span className="text-sm font-medium">4/5 (80%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Numerical</span>
                      <span className="text-sm font-medium">2/2 (100%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Exam Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Time Spent</span>
                    <span className="text-sm font-medium">{currentResult.timeSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Submitted At</span>
                    <span className="text-sm font-medium">{currentResult.submittedAt}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Total Questions</span>
                    <span className="text-sm font-medium">{currentResult.questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">AI Evaluation</span>
                    <Badge variant="outline" className="text-green-600">
                      Completed
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question-wise Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentResult.questions.map((question, index) => (
                    <div key={question.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                            Q{index + 1}
                          </span>
                          <Badge variant={question.obtained === question.marks ? "default" : "secondary"}>
                            {question.obtained}/{question.marks} marks
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Brain className="h-4 w-4 text-purple-600" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            AI Confidence: {question.aiConfidence}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="font-medium text-gray-900 dark:text-white">{question.question}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Answer:</h4>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border">
                              <p className="text-sm">{question.yourAnswer}</p>
                            </div>
                          </div>

                          {question.correctAnswer && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Expected Answer:</h4>
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded border">
                                <p className="text-sm">{question.correctAnswer}</p>
                              </div>
                            </div>
                          )}
                        </div>

                        {question.obtained < question.marks && (
                          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded border border-yellow-200 dark:border-yellow-800">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              <strong>AI Feedback:</strong> Consider including more detailed explanation of the concept
                              and providing a specific example to improve your score.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-purple-600" />
                  AI-Powered Feedback & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">Strengths Identified</h3>
                  <ul className="space-y-1 text-sm text-green-700 dark:text-green-300">
                    <li>• Excellent understanding of derivative calculations</li>
                    <li>• Strong problem-solving approach in numerical questions</li>
                    <li>• Good time management throughout the exam</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Areas for Improvement</h3>
                  <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                    <li>• Provide more detailed explanations in descriptive answers</li>
                    <li>• Include specific examples when explaining concepts</li>
                    <li>• Review fundamental theorems and their applications</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Study Recommendations</h3>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    <li>• Focus on limit theory and practical applications</li>
                    <li>• Practice more descriptive questions with detailed explanations</li>
                    <li>• Review calculus fundamentals and theorem statements</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold">Topic-wise Performance</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Derivatives</span>
                          <span>100%</span>
                        </div>
                        <Progress value={100} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Limits</span>
                          <span>80%</span>
                        </div>
                        <Progress value={80} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Integration</span>
                          <span>90%</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold">Class Comparison</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Your Score</span>
                        <span className="text-sm font-medium">85/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Class Average</span>
                        <span className="text-sm font-medium">78/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Highest Score</span>
                        <span className="text-sm font-medium">96/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Your Percentile</span>
                        <span className="text-sm font-medium text-green-600">92nd</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
