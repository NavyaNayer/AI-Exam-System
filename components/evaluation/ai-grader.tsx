"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Brain,
  CheckCircle,
  AlertTriangle,
  Eye,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
  FileText,
  Clock,
  Target,
  Zap,
  Users,
} from "lucide-react"

interface StudentResponse {
  id: string
  studentId: string
  studentName: string
  questionId: string
  question: string
  answer: string
  aiScore: number
  aiConfidence: number
  aiExplanation: string
  manualScore?: number
  status: "pending" | "ai-graded" | "flagged" | "manual-review" | "approved"
  plagiarismScore: number
  submittedAt: Date
}

export function AIGrader() {
  const [responses, setResponses] = useState<StudentResponse[]>([
    {
      id: "resp_001",
      studentId: "STU001",
      studentName: "John Doe",
      questionId: "q1",
      question: "Explain the difference between a stack and a queue. Provide examples of real-world applications.",
      answer:
        "A stack is a Last-In-First-Out (LIFO) data structure where elements are added and removed from the same end, called the top. A queue is a First-In-First-Out (FIFO) data structure where elements are added at one end (rear) and removed from the other end (front). Stack example: Browser back button, function call stack. Queue example: Print queue, customer service lines.",
      aiScore: 8.5,
      aiConfidence: 92,
      aiExplanation:
        "Excellent explanation covering key concepts, data structure behavior, and relevant examples. Minor deduction for not mentioning time complexity.",
      status: "ai-graded",
      plagiarismScore: 5,
      submittedAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "resp_002",
      studentId: "STU002",
      studentName: "Jane Smith",
      questionId: "q1",
      question: "Explain the difference between a stack and a queue. Provide examples of real-world applications.",
      answer:
        "Stack and queue are both linear data structures but they work differently. Stack follows LIFO principle while queue follows FIFO principle.",
      aiScore: 4.2,
      aiConfidence: 78,
      aiExplanation:
        "Basic understanding demonstrated but lacks depth. Missing examples and detailed explanation of operations.",
      status: "flagged",
      plagiarismScore: 15,
      submittedAt: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: "resp_003",
      studentId: "STU003",
      studentName: "Mike Johnson",
      questionId: "q2",
      question: "What is the time complexity of binary search and why?",
      answer:
        "Binary search has O(log n) time complexity because it divides the search space in half with each iteration. This logarithmic behavior occurs because we eliminate half of the remaining elements at each step, leading to at most log₂(n) comparisons for an array of size n.",
      aiScore: 9.8,
      aiConfidence: 96,
      aiExplanation: "Perfect explanation with correct complexity analysis and clear reasoning.",
      status: "ai-graded",
      plagiarismScore: 3,
      submittedAt: new Date(Date.now() - 15 * 60 * 1000),
    },
  ])

  const [selectedResponse, setSelectedResponse] = useState<string | null>(null)
  const [gradingProgress, setGradingProgress] = useState(0)
  const [isGrading, setIsGrading] = useState(false)
  const [gradingStats] = useState({
    totalResponses: 156,
    aiGraded: 142,
    flaggedForReview: 8,
    manuallyReviewed: 6,
    averageConfidence: 89.3,
  })

  const handleStartGrading = async () => {
    setIsGrading(true)
    setGradingProgress(0)

    // Simulate AI grading process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setGradingProgress(i)
    }

    setIsGrading(false)
  }

  const handleApproveGrade = (responseId: string) => {
    setResponses((prev) =>
      prev.map((resp) => (resp.id === responseId ? { ...resp, status: "approved" as const } : resp)),
    )
  }

  const handleFlagForReview = (responseId: string) => {
    setResponses((prev) =>
      prev.map((resp) => (resp.id === responseId ? { ...resp, status: "manual-review" as const } : resp)),
    )
  }

  const handleManualGrade = (responseId: string, score: number) => {
    setResponses((prev) =>
      prev.map((resp) =>
        resp.id === responseId ? { ...resp, manualScore: score, status: "approved" as const } : resp,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ai-graded":
        return "bg-blue-500"
      case "approved":
        return "bg-green-500"
      case "flagged":
        return "bg-yellow-500"
      case "manual-review":
        return "bg-orange-500"
      case "pending":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600"
    if (confidence >= 75) return "text-yellow-600"
    return "text-red-600"
  }

  const selectedResponseData = responses.find((r) => r.id === selectedResponse)

  return (
    <div className="space-y-6">
      {/* Grading Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{gradingStats.totalResponses}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Responses</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{gradingStats.aiGraded}</div>
            <div className="text-sm text-green-700 dark:text-green-300">AI Graded</div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-600">{gradingStats.flaggedForReview}</div>
            <div className="text-sm text-yellow-700 dark:text-yellow-300">Flagged</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{gradingStats.manuallyReviewed}</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Manual Review</div>
          </CardContent>
        </Card>
        <Card className="bg-teal-50 dark:bg-teal-900/20">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-teal-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-teal-600">{gradingStats.averageConfidence}%</div>
            <div className="text-sm text-teal-700 dark:text-teal-300">Avg Confidence</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI-Powered Evaluation System
          </CardTitle>
          <CardDescription>Automated grading with AI analysis and manual review capabilities</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="responses" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="responses">Student Responses</TabsTrigger>
              <TabsTrigger value="grading">Batch Grading</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">AI Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="responses" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Response List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Student Responses</h3>
                    <Button onClick={handleStartGrading} disabled={isGrading} className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      {isGrading ? "Grading..." : "Grade All"}
                    </Button>
                  </div>

                  {isGrading && (
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Brain className="h-4 w-4 text-blue-600 animate-pulse" />
                            <span className="text-sm font-medium">AI is grading responses...</span>
                          </div>
                          <Progress value={gradingProgress} className="w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    {responses.map((response) => (
                      <Card
                        key={response.id}
                        className={`cursor-pointer transition-all ${
                          selectedResponse === response.id
                            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => setSelectedResponse(response.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{response.studentName}</h4>
                                <p className="text-sm text-muted-foreground">ID: {response.studentId}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="text-lg font-bold">{response.manualScore || response.aiScore}/10</div>
                                <div className={`text-xs ${getConfidenceColor(response.aiConfidence)}`}>
                                  {response.aiConfidence}% confidence
                                </div>
                              </div>
                              <Badge className={`${getStatusColor(response.status)} text-white text-xs`}>
                                {response.status.replace("-", " ")}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <p className="text-sm text-muted-foreground line-clamp-2">{response.answer}</p>
                          </div>

                          {response.plagiarismScore > 10 && (
                            <div className="mt-2">
                              <Badge variant="destructive" className="text-xs">
                                Plagiarism: {response.plagiarismScore}%
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Detailed Review */}
                <div>
                  {selectedResponseData ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Review: {selectedResponseData.studentName}</CardTitle>
                        <CardDescription>Submitted {selectedResponseData.submittedAt.toLocaleString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Question */}
                        <div>
                          <h4 className="font-medium mb-2">Question:</h4>
                          <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded">
                            {selectedResponseData.question}
                          </p>
                        </div>

                        {/* Student Answer */}
                        <div>
                          <h4 className="font-medium mb-2">Student Answer:</h4>
                          <div className="text-sm bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                            {selectedResponseData.answer}
                          </div>
                        </div>

                        {/* AI Analysis */}
                        <div>
                          <h4 className="font-medium mb-2">AI Analysis:</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span>AI Score:</span>
                              <Badge className="bg-blue-500 text-white">{selectedResponseData.aiScore}/10</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Confidence:</span>
                              <Badge
                                variant="outline"
                                className={getConfidenceColor(selectedResponseData.aiConfidence)}
                              >
                                {selectedResponseData.aiConfidence}%
                              </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Plagiarism:</span>
                              <Badge variant={selectedResponseData.plagiarismScore > 10 ? "destructive" : "outline"}>
                                {selectedResponseData.plagiarismScore}%
                              </Badge>
                            </div>
                          </div>
                          <div className="mt-3">
                            <p className="text-sm text-muted-foreground">{selectedResponseData.aiExplanation}</p>
                          </div>
                        </div>

                        {/* Manual Override */}
                        {selectedResponseData.status !== "approved" && (
                          <div>
                            <h4 className="font-medium mb-2">Manual Review:</h4>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Label htmlFor="manualScore">Override Score:</Label>
                                <Input
                                  id="manualScore"
                                  type="number"
                                  min="0"
                                  max="10"
                                  step="0.1"
                                  className="w-20"
                                  placeholder="0-10"
                                />
                                <Button size="sm" onClick={() => handleManualGrade(selectedResponseData.id, 8.5)}>
                                  Apply
                                </Button>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  onClick={() => handleApproveGrade(selectedResponseData.id)}
                                  className="flex items-center gap-2"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                  Approve AI Grade
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleFlagForReview(selectedResponseData.id)}
                                  className="flex items-center gap-2 bg-transparent"
                                >
                                  <ThumbsDown className="h-4 w-4" />
                                  Flag for Review
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedResponseData.status === "approved" && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              This response has been approved with a final score of{" "}
                              {selectedResponseData.manualScore || selectedResponseData.aiScore}/10.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-medium mb-2">Select a Response</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose a student response from the list to review AI grading and provide manual feedback.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="grading" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Batch Grading Operations</CardTitle>
                  <CardDescription>Process multiple responses simultaneously with AI</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-4 text-center">
                        <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">2.3s</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Avg Processing Time</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardContent className="p-4 text-center">
                        <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">94.7%</div>
                        <div className="text-sm text-green-700 dark:text-green-300">Accuracy Rate</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/20">
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">156</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Responses/Hour</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Button onClick={handleStartGrading} disabled={isGrading} className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      {isGrading ? "Processing..." : "Start Batch Grading"}
                    </Button>

                    {isGrading && (
                      <div className="space-y-2">
                        <Progress value={gradingProgress} className="w-full" />
                        <p className="text-sm text-center text-muted-foreground">
                          Processing {Math.floor((gradingProgress / 100) * responses.length)} of {responses.length}{" "}
                          responses...
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Grading Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { range: "9-10", count: 23, percentage: 35 },
                        { range: "7-8", count: 28, percentage: 43 },
                        { range: "5-6", count: 12, percentage: 18 },
                        { range: "0-4", count: 3, percentage: 4 },
                      ].map((item) => (
                        <div key={item.range} className="flex items-center gap-3">
                          <div className="w-12 text-sm font-medium">{item.range}</div>
                          <div className="flex-1">
                            <Progress value={item.percentage} className="h-2" />
                          </div>
                          <div className="w-16 text-sm text-muted-foreground text-right">
                            {item.count} ({item.percentage}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>AI Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Accuracy</span>
                      <Badge className="bg-green-500 text-white">94.7%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Average Confidence</span>
                      <Badge variant="outline">89.3%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Manual Override Rate</span>
                      <Badge variant="outline">5.2%</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Plagiarism Detection</span>
                      <Badge className="bg-red-500 text-white">8 cases</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>AI Grading Configuration</CardTitle>
                  <CardDescription>Adjust AI parameters for optimal grading performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="confidenceThreshold">Confidence Threshold</Label>
                        <Input id="confidenceThreshold" type="number" min="0" max="100" defaultValue="85" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Responses below this confidence level will be flagged for manual review
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="plagiarismThreshold">Plagiarism Threshold</Label>
                        <Input id="plagiarismThreshold" type="number" min="0" max="100" defaultValue="15" />
                        <p className="text-xs text-muted-foreground mt-1">
                          Responses above this similarity score will be flagged
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="gradingModel">AI Model</Label>
                        <select className="w-full p-2 border rounded" defaultValue="gpt-4">
                          <option value="gpt-4">GPT-4 (Recommended)</option>
                          <option value="claude-3">Claude-3</option>
                          <option value="custom">Custom Model</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="batchSize">Batch Processing Size</Label>
                        <Input id="batchSize" type="number" min="1" max="100" defaultValue="25" />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Configuration</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
