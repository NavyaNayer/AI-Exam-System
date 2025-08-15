"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Wand2,
  FileText,
  CheckCircle,
  Plus,
  Settings,
  Lightbulb,
  Target,
  Shuffle,
  Download,
  Upload,
} from "lucide-react"

interface GeneratedQuestion {
  id: string
  type: "mcq" | "descriptive" | "numerical" | "true-false"
  question: string
  options?: string[]
  correctAnswer: string
  explanation: string
  difficulty: "easy" | "medium" | "hard"
  topic: string
  bloomsLevel: string
  estimatedTime: number
}

export function QuestionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([])
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])

  const [formData, setFormData] = useState({
    subject: "",
    topic: "",
    difficulty: "",
    questionType: "",
    numQuestions: 10,
    bloomsLevel: "",
    curriculum: "",
    learningObjectives: "",
  })

  const handleGenerate = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI generation process
    const steps = [
      "Analyzing curriculum content...",
      "Identifying key concepts...",
      "Generating question variations...",
      "Calibrating difficulty levels...",
      "Creating answer explanations...",
      "Finalizing questions...",
    ]

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setGenerationProgress(((i + 1) / steps.length) * 100)
    }

    // Mock generated questions
    const mockQuestions: GeneratedQuestion[] = Array.from({ length: formData.numQuestions }, (_, index) => ({
      id: `q_${Date.now()}_${index}`,
      type: formData.questionType as any,
      question: `What is the time complexity of inserting an element at the beginning of a linked list? (Question ${
        index + 1
      })`,
      options:
        formData.questionType === "mcq"
          ? ["O(1) - Constant time", "O(n) - Linear time", "O(log n) - Logarithmic time", "O(n²) - Quadratic time"]
          : undefined,
      correctAnswer:
        formData.questionType === "mcq"
          ? "O(1) - Constant time"
          : "O(1) because we only need to update the head pointer and set the new node's next pointer.",
      explanation:
        "Inserting at the beginning of a linked list requires only updating the head pointer and setting the new node's next pointer to the previous head, which takes constant time regardless of the list size.",
      difficulty: formData.difficulty as any,
      topic: formData.topic,
      bloomsLevel: formData.bloomsLevel,
      estimatedTime: formData.questionType === "mcq" ? 2 : 5,
    }))

    setGeneratedQuestions(mockQuestions)
    setIsGenerating(false)
  }

  const toggleQuestionSelection = (questionId: string) => {
    setSelectedQuestions((prev) =>
      prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId],
    )
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mcq":
        return "📝"
      case "descriptive":
        return "✍️"
      case "numerical":
        return "🔢"
      case "true-false":
        return "✅"
      default:
        return "❓"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Question Generator
          </CardTitle>
          <CardDescription>Generate contextually relevant questions using advanced AI models</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="generate" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="generate">Generate</TabsTrigger>
              <TabsTrigger value="review">Review & Approve</TabsTrigger>
              <TabsTrigger value="bank">Question Bank</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer-science">Computer Science</SelectItem>
                      <SelectItem value="mathematics">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Data Structures, Algorithms"
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questionType">Question Type</Label>
                  <Select
                    value={formData.questionType}
                    onValueChange={(value) => setFormData({ ...formData, questionType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select question type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mcq">Multiple Choice</SelectItem>
                      <SelectItem value="descriptive">Descriptive</SelectItem>
                      <SelectItem value="numerical">Numerical</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numQuestions">Number of Questions</Label>
                  <Input
                    id="numQuestions"
                    type="number"
                    min="1"
                    max="50"
                    value={formData.numQuestions}
                    onChange={(e) => setFormData({ ...formData, numQuestions: Number.parseInt(e.target.value) || 10 })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloomsLevel">Bloom's Taxonomy Level</Label>
                  <Select
                    value={formData.bloomsLevel}
                    onValueChange={(value) => setFormData({ ...formData, bloomsLevel: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select cognitive level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="remember">Remember</SelectItem>
                      <SelectItem value="understand">Understand</SelectItem>
                      <SelectItem value="apply">Apply</SelectItem>
                      <SelectItem value="analyze">Analyze</SelectItem>
                      <SelectItem value="evaluate">Evaluate</SelectItem>
                      <SelectItem value="create">Create</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="curriculum">Curriculum Content</Label>
                  <Textarea
                    id="curriculum"
                    placeholder="Paste your curriculum content, textbook chapters, or learning materials here..."
                    className="min-h-[120px]"
                    value={formData.curriculum}
                    onChange={(e) => setFormData({ ...formData, curriculum: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="learningObjectives">Learning Objectives</Label>
                  <Textarea
                    id="learningObjectives"
                    placeholder="Specify what students should be able to do after learning this topic..."
                    className="min-h-[80px]"
                    value={formData.learningObjectives}
                    onChange={(e) => setFormData({ ...formData, learningObjectives: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Button onClick={handleGenerate} disabled={isGenerating} className="flex items-center gap-2">
                  <Wand2 className="h-4 w-4" />
                  {isGenerating ? "Generating..." : "Generate Questions"}
                </Button>
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <Upload className="h-4 w-4" />
                  Upload Content
                </Button>
              </div>

              {isGenerating && (
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Brain className="h-5 w-5 text-blue-600 animate-pulse" />
                        <span className="font-medium">AI is generating your questions...</span>
                      </div>
                      <Progress value={generationProgress} className="w-full" />
                      <p className="text-sm text-muted-foreground">
                        This may take a few moments while our AI analyzes your content and creates high-quality
                        questions.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="review" className="space-y-6">
              {generatedQuestions.length > 0 ? (
                <>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Generated Questions ({generatedQuestions.length})</h3>
                      <p className="text-sm text-muted-foreground">
                        Review and select questions to add to your question bank
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setSelectedQuestions(generatedQuestions.map((q) => q.id))}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        Select All
                      </Button>
                      <Button disabled={selectedQuestions.length === 0} className="flex items-center gap-2">
                        <Plus className="h-4 w-4" />
                        Add Selected ({selectedQuestions.length})
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {generatedQuestions.map((question, index) => (
                      <Card
                        key={question.id}
                        className={`cursor-pointer transition-all ${
                          selectedQuestions.includes(question.id)
                            ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => toggleQuestionSelection(question.id)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="text-2xl">{getTypeIcon(question.type)}</div>
                              <div>
                                <CardTitle className="text-base">Question {index + 1}</CardTitle>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className={`${getDifficultyColor(question.difficulty)} text-white text-xs`}>
                                    {question.difficulty}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {question.bloomsLevel}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {question.estimatedTime}min
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {selectedQuestions.includes(question.id) && (
                                <CheckCircle className="h-5 w-5 text-blue-600" />
                              )}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Question:</h4>
                              <p className="text-sm">{question.question}</p>
                            </div>

                            {question.options && (
                              <div>
                                <h4 className="font-medium mb-2">Options:</h4>
                                <div className="space-y-1">
                                  {question.options.map((option, idx) => (
                                    <div
                                      key={idx}
                                      className={`text-sm p-2 rounded ${
                                        option === question.correctAnswer
                                          ? "bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200"
                                          : "bg-gray-50 dark:bg-gray-800"
                                      }`}
                                    >
                                      {String.fromCharCode(65 + idx)}. {option}
                                      {option === question.correctAnswer && (
                                        <Badge className="ml-2 bg-green-600 text-white text-xs">Correct</Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div>
                              <h4 className="font-medium mb-2">Explanation:</h4>
                              <p className="text-sm text-muted-foreground">{question.explanation}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Questions Generated Yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Use the Generate tab to create AI-powered questions from your curriculum content.
                    </p>
                    <Button variant="outline">Go to Generate Tab</Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="bank" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Question Bank</h3>
                  <p className="text-sm text-muted-foreground">Manage your approved questions</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <Shuffle className="h-4 w-4" />
                    Randomize
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-blue-600">247</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Total Questions</div>
                  </CardContent>
                </Card>
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="p-4 text-center">
                    <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">89%</div>
                    <div className="text-sm text-green-700 dark:text-green-300">AI Accuracy</div>
                  </CardContent>
                </Card>
                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4 text-center">
                    <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">156</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">AI Generated</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardContent className="p-4 text-center">
                    <Settings className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">12</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">Active Exams</div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <Brain className="h-4 w-4" />
                <AlertDescription>
                  AI continuously learns from question performance and student feedback to improve future generations.
                </AlertDescription>
              </Alert>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
