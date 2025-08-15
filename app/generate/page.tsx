"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Brain, Sparkles, FileText, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function GeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [difficulty, setDifficulty] = useState([50])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedQuestions([
        {
          id: 1,
          type: "MCQ",
          question: "What is the derivative of x² + 3x + 2?",
          options: ["2x + 3", "x² + 3", "2x + 2", "x + 3"],
          correct: 0,
          difficulty: "Medium",
          topic: "Calculus",
        },
        {
          id: 2,
          type: "Descriptive",
          question: "Explain the concept of limits in calculus and provide an example.",
          difficulty: "Hard",
          topic: "Calculus",
        },
        {
          id: 3,
          type: "Numerical",
          question: "Calculate the area under the curve y = x² from x = 0 to x = 2.",
          answer: "8/3",
          difficulty: "Medium",
          topic: "Integration",
        },
      ])
      setIsGenerating(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              AI Question Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Generate diverse, contextually relevant questions using AI
            </p>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generation Form */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-purple-600" />
                  Generation Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic/Chapter</Label>
                  <Input id="topic" placeholder="e.g., Calculus, Derivatives" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="curriculum">Curriculum Content</Label>
                  <Textarea
                    id="curriculum"
                    placeholder="Paste your curriculum content, learning objectives, or reference material here..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question-type">Question Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed">Mixed (Recommended)</SelectItem>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="descriptive">Descriptive</SelectItem>
                      <SelectItem value="numerical">Numerical</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="count">Number of Questions</Label>
                  <Input id="count" type="number" defaultValue="5" min="1" max="50" />
                </div>

                <div className="space-y-3">
                  <Label>Difficulty Level: {difficulty[0]}%</Label>
                  <Slider value={difficulty} onValueChange={setDifficulty} max={100} step={10} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Easy</span>
                    <span>Medium</span>
                    <span>Hard</span>
                  </div>
                </div>

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Questions
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Generated Questions */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-green-600" />
                  Generated Questions
                  {generatedQuestions.length > 0 && (
                    <Badge variant="secondary">{generatedQuestions.length} questions</Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {generatedQuestions.length === 0 ? (
                  <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No questions generated yet. Use the form to generate AI-powered questions.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {generatedQuestions.map((question, index) => (
                      <div key={question.id} className="border rounded-lg p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded text-sm font-medium">
                              Q{index + 1}
                            </span>
                            <Badge variant="outline">{question.type}</Badge>
                            <Badge variant="secondary">{question.difficulty}</Badge>
                            <Badge variant="outline" className="text-xs">
                              {question.topic}
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="font-medium text-gray-900 dark:text-white">{question.question}</p>

                          {question.type === "MCQ" && question.options && (
                            <div className="space-y-2">
                              {question.options.map((option: string, optIndex: number) => (
                                <div
                                  key={optIndex}
                                  className={`p-2 rounded border ${
                                    optIndex === question.correct
                                      ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                      : "bg-gray-50 dark:bg-gray-800"
                                  }`}
                                >
                                  <span className="font-medium mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                  {option}
                                  {optIndex === question.correct && (
                                    <CheckCircle className="h-4 w-4 text-green-600 inline ml-2" />
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {question.type === "Numerical" && question.answer && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded border border-blue-200 dark:border-blue-800">
                              <span className="font-medium text-blue-800 dark:text-blue-200">
                                Answer: {question.answer}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-center gap-4 pt-6 border-t">
                      <Button variant="outline">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Regenerate All
                      </Button>
                      <Button>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve & Save Questions
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
