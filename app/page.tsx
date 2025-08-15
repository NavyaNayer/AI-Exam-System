import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Shield, Users, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Digital Exam System</h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            AI-powered paperless examination platform for secure digital assessments
          </p>
        </div>

        {/* Login Section */}
        <div className="max-w-md mx-auto">
          <Tabs defaultValue="student" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="faculty">Faculty</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            <TabsContent value="student">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Student Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input id="student-id" placeholder="Enter your student ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input id="student-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/student/dashboard">Login as Student</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faculty">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Faculty Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="faculty-id">Faculty ID</Label>
                    <Input id="faculty-id" placeholder="Enter your faculty ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty-password">Password</Label>
                    <Input id="faculty-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/faculty/dashboard">Login as Faculty</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="admin">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Admin Login
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="admin-id">Admin ID</Label>
                    <Input id="admin-id" placeholder="Enter your admin ID" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="admin-password">Password</Label>
                    <Input id="admin-password" type="password" placeholder="Enter your password" />
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/admin/dashboard">Login as Admin</Link>
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Quick Demo Access */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Or try the demo:</p>
          <div className="flex justify-center gap-4">
            <Button asChild variant="outline" size="sm">
              <Link href="/student/dashboard">Student Demo</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/faculty/dashboard">Faculty Demo</Link>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href="/admin/dashboard">Admin Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
