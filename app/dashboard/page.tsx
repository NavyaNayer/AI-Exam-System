"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, PenTool, BarChart3, Users, Clock, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const [userRole, setUserRole] = useState("faculty")

  const facultyStats = [
    { title: "Active Exams", value: "12", icon: PenTool, color: "text-blue-600" },
    { title: "Questions Generated", value: "248", icon: Brain, color: "text-green-600" },
    { title: "Students Enrolled", value: "156", icon: Users, color: "text-purple-600" },
    { title: "Pending Reviews", value: "8", icon: AlertCircle, color: "text-orange-600" },
  ]

  const studentStats = [
    { title: "Upcoming Exams", value: "3", icon: Clock, color: "text-blue-600" },
    { title: "Completed Exams", value: "15", icon: CheckCircle, color: "text-green-600" },
    { title: "Average Score", value: "87%", icon: BarChart3, color: "text-purple-600" },
    { title: "Pending Results", value: "2", icon: AlertCircle, color: "text-orange-600" },
  ]

  const currentStats = userRole === "faculty" ? facultyStats : studentStats

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome to your AI-powered examination system</p>
          </div>
          <div className="flex items-center gap-4">
            <Select value={userRole} onValueChange={setUserRole}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="faculty">Faculty</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {currentStats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="exams">Exams</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="results">Results</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">AI Generated 15 new questions</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Mathematics - Calculus</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Exam completed successfully</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Physics - Mechanics</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="font-medium">Results published</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Chemistry - Organic</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start">
                    <Link href="/generate">
                      <Brain className="h-4 w-4 mr-2" />
                      Generate Questions with AI
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/exam">
                      <PenTool className="h-4 w-4 mr-2" />
                      {userRole === "faculty" ? "Create New Exam" : "Take Exam"}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                    <Link href="/results">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Results & Analytics
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exams" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{userRole === "faculty" ? "Manage Exams" : "Your Exams"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((exam) => (
                    <div key={exam} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Mathematics Final Exam</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Duration: 2 hours • Questions: 50 • Status: Active
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">Active</Badge>
                        <Button size="sm">{userRole === "faculty" ? "Manage" : "Take Exam"}</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Question Bank</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((question) => (
                    <div key={question} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold">What is the derivative of x²?</h3>
                        <Badge variant="secondary">MCQ</Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Subject: Mathematics • Difficulty: Medium • AI Generated
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          Calculus
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Derivatives
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{userRole === "faculty" ? "Student Results" : "Your Results"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((result) => (
                    <div key={result} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">Physics Midterm</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {userRole === "faculty" ? "Average Score: 78%" : "Your Score: 85%"} • AI Evaluated •
                          Completed: 2 days ago
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-green-600">
                          Passed
                        </Badge>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
