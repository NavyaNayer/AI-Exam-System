import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, Calendar, User, BarChart3 } from "lucide-react"
import Link from "next/link"

export default function StudentDashboard() {
  const upcomingExams = [
    {
      id: 1,
      subject: "Data Structures",
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "2 hours",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Database Systems",
      date: "2024-01-18",
      time: "2:00 PM",
      duration: "3 hours",
      status: "upcoming",
    },
    {
      id: 3,
      subject: "Web Development",
      date: "2024-01-20",
      time: "9:00 AM",
      duration: "2.5 hours",
      status: "upcoming",
    },
  ]

  const completedExams = [
    { id: 4, subject: "Operating Systems", score: 85, maxScore: 100, date: "2024-01-10", status: "completed" },
    { id: 5, subject: "Computer Networks", score: 92, maxScore: 100, date: "2024-01-08", status: "completed" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Student Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Welcome back, John Doe</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1">
              <User className="h-4 w-4 mr-2" />
              Student ID: ST2024001
            </Badge>
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
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Upcoming Exams</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingExams.length}</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedExams.length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">88.5%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Next Exam</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">3 days</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Upcoming Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingExams.map((exam) => (
                <div key={exam.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-semibold">{exam.subject}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {exam.date} at {exam.time} • {exam.duration}
                    </p>
                  </div>
                  <Button asChild size="sm">
                    <Link href={`/student/exam/${exam.id}`}>Start Exam</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Results
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {completedExams.map((exam) => (
                <div key={exam.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{exam.subject}</h3>
                    <Badge variant={exam.score >= 80 ? "default" : "secondary"}>
                      {exam.score}/{exam.maxScore}
                    </Badge>
                  </div>
                  <Progress value={(exam.score / exam.maxScore) * 100} className="mb-2" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">Completed on {exam.date}</p>
                  <Button asChild variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Link href={`/student/results/${exam.id}`}>View Details</Link>
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
