import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, BookOpen, Users, BarChart3, Brain, Settings, FileText } from "lucide-react"
import Link from "next/link"

export default function FacultyDashboard() {
  const recentExams = [
    { id: 1, subject: "Data Structures", students: 45, date: "2024-01-15", status: "upcoming" },
    { id: 2, subject: "Database Systems", students: 38, date: "2024-01-18", status: "upcoming" },
    { id: 3, subject: "Operating Systems", students: 42, date: "2024-01-10", status: "completed" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Faculty Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome back, Dr. Sarah Johnson</p>
          </div>
          <div className="flex items-center gap-4">
            <Button asChild>
              <Link href="/faculty/create-exam">
                <Plus className="h-4 w-4 mr-2" />
                Create New Exam
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">Logout</Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Exams</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">12</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Students</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">125</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Generated</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">8</p>
                </div>
                <Brain className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">82%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start">
                <Link href="/faculty/ai-generate">
                  <Brain className="h-4 w-4 mr-2" />
                  Generate Questions with AI
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/faculty/question-bank">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Manage Question Bank
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/faculty/results">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Results & Analytics
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start bg-transparent">
                <Link href="/faculty/settings">
                  <Settings className="h-4 w-4 mr-2" />
                  Exam Settings
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Exams */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Exams</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{exam.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.students} students • {exam.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={exam.status === "upcoming" ? "default" : "secondary"}>{exam.status}</Badge>
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/faculty/exam/${exam.id}`}>
                        {exam.status === "upcoming" ? "Manage" : "View Results"}
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
