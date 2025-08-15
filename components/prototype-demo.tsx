"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  FileText,
  Brain,
  Shield,
  Clock,
  CheckCircle,
  Settings,
  Monitor,
  User,
  GraduationCap,
} from "lucide-react"
import { useState } from "react"

export function PrototypeDemo() {
  const [selectedRole, setSelectedRole] = useState("student")
  const [examProgress, setExamProgress] = useState(45)

  const roles = [
    { id: "admin", label: "Administrator", icon: Settings, color: "bg-red-500" },
    { id: "faculty", label: "Faculty", icon: GraduationCap, color: "bg-blue-500" },
    { id: "student", label: "Student", icon: User, color: "bg-green-500" },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-6 w-6 text-green-600" />
            Interactive System Prototype
          </CardTitle>
          <CardDescription>
            Experience the AI-powered examination system from different user perspectives
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Selector */}
          <div className="mb-6">
            <Label className="text-base font-medium mb-3 block">Select User Role:</Label>
            <div className="flex gap-3">
              {roles.map((role) => {
                const IconComponent = role.icon
                return (
                  <Button
                    key={role.id}
                    variant={selectedRole === role.id ? "default" : "outline"}
                    onClick={() => setSelectedRole(role.id)}
                    className="flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {role.label}
                  </Button>
                )
              })}
            </div>
          </div>

          {/* Role-specific Interfaces */}
          <Tabs value={selectedRole} className="w-full">
            {/* Administrator Interface */}
            <TabsContent value="admin">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-blue-600">1,247</div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">Active Users</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-green-600">89</div>
                      <div className="text-sm text-green-700 dark:text-green-300">Active Exams</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50 dark:bg-purple-900/20">
                    <CardContent className="p-4 text-center">
                      <Brain className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                      <div className="text-2xl font-bold text-purple-600">15,432</div>
                      <div className="text-sm text-purple-700 dark:text-purple-300">AI-Generated Questions</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>System Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ai-model">AI Model Selection</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select AI model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gpt4">GPT-4 (Recommended)</SelectItem>
                            <SelectItem value="claude">Claude-3</SelectItem>
                            <SelectItem value="custom">Custom Model</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="security-level">Security Level</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select security level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="high">High Security</SelectItem>
                            <SelectItem value="medium">Medium Security</SelectItem>
                            <SelectItem value="basic">Basic Security</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="w-full">Update Configuration</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Faculty Interface */}
            <TabsContent value="faculty">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create New Exam</CardTitle>
                    <CardDescription>AI will generate questions based on your specifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="exam-title">Exam Title</Label>
                        <Input id="exam-title" placeholder="e.g., Data Structures Midterm" />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cs">Computer Science</SelectItem>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="topics">Topics to Cover</Label>
                      <Textarea
                        id="topics"
                        placeholder="Enter topics separated by commas (e.g., Arrays, Linked Lists, Trees, Graphs)"
                        className="min-h-[100px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Input id="duration" type="number" placeholder="120" />
                      </div>
                      <div>
                        <Label htmlFor="questions">Number of Questions</Label>
                        <Input id="questions" type="number" placeholder="25" />
                      </div>
                      <div>
                        <Label htmlFor="difficulty">Difficulty Level</Label>
                        <Select>
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
                    </div>
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Exam with AI
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Exams</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { title: "Database Systems Final", students: 45, status: "Completed", score: "87%" },
                        { title: "Algorithms Quiz", students: 52, status: "In Progress", score: "N/A" },
                        { title: "Software Engineering Midterm", students: 38, status: "Grading", score: "92%" },
                      ].map((exam, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <div className="font-medium">{exam.title}</div>
                            <div className="text-sm text-muted-foreground">{exam.students} students</div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                exam.status === "Completed"
                                  ? "default"
                                  : exam.status === "In Progress"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {exam.status}
                            </Badge>
                            <div className="text-sm font-medium">{exam.score}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Student Interface */}
            <TabsContent value="student">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Exam: Data Structures Midterm</CardTitle>
                    <CardDescription>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>45 minutes remaining</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          <span>Question 12 of 25</span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Progress value={examProgress} className="w-full" />

                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div>
                            <Badge className="mb-3">Question 12 - Multiple Choice</Badge>
                            <h3 className="text-lg font-medium mb-4">
                              What is the time complexity of inserting an element at the beginning of a linked list?
                            </h3>
                          </div>

                          <div className="space-y-3">
                            {[
                              "O(1) - Constant time",
                              "O(n) - Linear time",
                              "O(log n) - Logarithmic time",
                              "O(n²) - Quadratic time",
                            ].map((option, index) => (
                              <label
                                key={index}
                                className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-background"
                              >
                                <input type="radio" name="question12" value={index} className="text-blue-600" />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="flex justify-between">
                      <Button variant="outline">Previous Question</Button>
                      <div className="flex gap-2">
                        <Button variant="outline">Save & Continue</Button>
                        <Button>Next Question</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Exam Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">8</div>
                        <div className="text-sm text-muted-foreground">Completed</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">4</div>
                        <div className="text-sm text-muted-foreground">In Progress</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-600">13</div>
                        <div className="text-sm text-muted-foreground">Remaining</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* System Features Demo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
              <Brain className="h-5 w-5" />
              AI Features Active
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Question Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Real-time Proctoring</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Plagiarism Detection</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Auto Evaluation</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <Shield className="h-5 w-5" />
              Security Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">End-to-End Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Multi-Factor Authentication</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Secure Session Management</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm">Audit Trail Logging</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
