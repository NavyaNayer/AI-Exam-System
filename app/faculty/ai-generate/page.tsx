"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Brain, Wand2, Settings, CheckCircle, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function AIGeneratePage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [difficulty, setDifficulty] = useState([5])

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedQuestions([
        {
          id: 1,
          type: "mcq",
          question: "What is the time complexity of inserting an element at the beginning of a linked list?",
          options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
          correct: "O(1)",
          difficulty: "Medium",
          marks: 2,
        },
        {
          id: 2,
          type: "descriptive",
          question:
            "Explain the concept of dynamic programming with an example. Discuss its advantages over recursive approaches.",
          difficulty: "Hard",
          marks: 10,
        },
        {
          id: 3,
          type: "mcq",
          question: "Which sorting algorithm has the best average-case time complexity?",
          options: ["Bubble Sort", "Quick Sort", "Merge Sort", "Selection Sort"],
          correct: "Merge Sort",
          difficulty: "Easy",
          marks: 2,
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
              <Brain className="h-8 w-8 text-purple-600" />
              AI Question Generator
            </h1>
            <p className="text-gray-600 dark:text-gray-300">Generate diverse questions using artificial intelligence</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/faculty/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generation Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Generation Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="e.g., Data Structures" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic">Topic/Chapter</Label>
                <Input id="topic" placeholder="e.g., Linked Lists, Trees" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="curriculum">Curriculum Content</Label>
                <Textarea
                  id="curriculum"
                  placeholder="Paste your curriculum content, learning objectives, or reference material here..."
                  className="min-h-[100px]"
                />
              </div>

              <div className="space-y-2">
                <Label>Question Types</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select question types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mixed">Mixed (MCQ + Descriptive)</SelectItem>
                    <SelectItem value="mcq">Multiple Choice Only</SelectItem>
                    <SelectItem value="descriptive">Descriptive Only</SelectItem>
                    <SelectItem value="numerical">Numerical Problems</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Number of Questions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 Questions</SelectItem>
                    <SelectItem value="10">10 Questions</SelectItem>
                    <SelectItem value="15">15 Questions</SelectItem>
                    <SelectItem value="20">20 Questions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level: {difficulty[0]}/10</Label>
                <Slider value={difficulty} onValueChange={setDifficulty} max={10} min={1} step={1} className="w-full" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Easy</span>
                  <span>Medium</span>
                  <span>Hard</span>
                </div>
              </div>

              <Button onClick={handleGenerate} className="w-full" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate Questions
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Questions */}
          <div className="lg:col-span-2 space-y-6">
            {isGenerating && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Brain className="h-12 w-12 mx-auto text-purple-600 mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold mb-2">AI is generating questions...</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Analyzing curriculum content and creating diverse questions
                  </p>
                </CardContent>
              </Card>
            )}

            {generatedQuestions.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Generated Questions</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Save to Bank
                    </Button>
                  </div>
                </div>

                {generatedQuestions.map((question, index) => (
                  <Card key={question.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Question {index + 1}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{question.type.toUpperCase()}</Badge>
                          <Badge variant="secondary">{question.difficulty}</Badge>
                          <Badge>{question.marks} marks</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-lg font-medium">{question.question}</p>

                      {question.type === "mcq" && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option: string, optIndex: number) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded border ${
                                option === question.correct
                                  ? "bg-green-50 border-green-200 dark:bg-green-900/20"
                                  : "bg-gray-50 border-gray-200 dark:bg-gray-800"
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                              {option === question.correct && (
                                <CheckCircle className="h-4 w-4 text-green-600 inline ml-2" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
