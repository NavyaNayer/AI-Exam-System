"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  AlertTriangle,
  Search,
  FileText,
  Users,
  Globe,
  Database,
  Eye,
  CheckCircle,
  XCircle,
} from "lucide-react"

interface PlagiarismCase {
  id: string
  studentId: string
  studentName: string
  questionId: string
  similarityScore: number
  matchedSources: string[]
  matchedStudents: string[]
  status: "detected" | "investigating" | "confirmed" | "dismissed"
  detectedAt: Date
}

export function PlagiarismDetector() {
  const [cases, setCases] = useState<PlagiarismCase[]>([
    {
      id: "plag_001",
      studentId: "STU002",
      studentName: "Jane Smith",
      questionId: "q1",
      similarityScore: 87,
      matchedSources: ["Wikipedia: Stack (abstract data type)", "GeeksforGeeks: Stack Data Structure"],
      matchedStudents: ["STU005", "STU012"],
      status: "detected",
      detectedAt: new Date(Date.now() - 30 * 60 * 1000),
    },
    {
      id: "plag_002",
      studentId: "STU007",
      studentName: "Alex Johnson",
      questionId: "q2",
      similarityScore: 72,
      matchedSources: ["Stack Overflow: Binary Search Implementation"],
      matchedStudents: [],
      status: "investigating",
      detectedAt: new Date(Date.now() - 45 * 60 * 1000),
    },
    {
      id: "plag_003",
      studentId: "STU015",
      studentName: "Sarah Wilson",
      questionId: "q1",
      similarityScore: 65,
      matchedSources: [],
      matchedStudents: ["STU018", "STU022"],
      status: "confirmed",
      detectedAt: new Date(Date.now() - 60 * 60 * 1000),
    },
  ])

  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [scanProgress, setScanProgress] = useState(0)
  const [isScanning, setIsScanning] = useState(false)

  const [detectionStats] = useState({
    totalResponses: 156,
    flaggedResponses: 12,
    confirmedCases: 3,
    falsePositives: 4,
    detectionRate: 7.7,
  })

  const handleStartScan = async () => {
    setIsScanning(true)
    setScanProgress(0)

    // Simulate plagiarism scanning
    for (let i = 0; i <= 100; i += 5) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setScanProgress(i)
    }

    setIsScanning(false)
  }

  const handleUpdateStatus = (caseId: string, newStatus: PlagiarismCase["status"]) => {
    setCases((prev) => prev.map((c) => (c.id === caseId ? { ...c, status: newStatus } : c)))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "detected":
        return "bg-red-500"
      case "investigating":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-red-600"
      case "dismissed":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getSimilarityColor = (score: number) => {
    if (score >= 80) return "text-red-600"
    if (score >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const selectedCaseData = cases.find((c) => c.id === selectedCase)

  return (
    <div className="space-y-6">
      {/* Detection Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{detectionStats.totalResponses}</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Total Responses</div>
          </CardContent>
        </Card>
        <Card className="bg-red-50 dark:bg-red-900/20">
          <CardContent className="p-4 text-center">
            <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-600">{detectionStats.flaggedResponses}</div>
            <div className="text-sm text-red-700 dark:text-red-300">Flagged</div>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 dark:bg-orange-900/20">
          <CardContent className="p-4 text-center">
            <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{detectionStats.confirmedCases}</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">Confirmed</div>
          </CardContent>
        </Card>
        <Card className="bg-green-50 dark:bg-green-900/20">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{detectionStats.falsePositives}</div>
            <div className="text-sm text-green-700 dark:text-green-300">False Positives</div>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 dark:bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <Search className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{detectionStats.detectionRate}%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Detection Rate</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-red-600" />
            Plagiarism Detection System
          </CardTitle>
          <CardDescription>AI-powered plagiarism detection with multi-source comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cases" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="cases">Detection Cases</TabsTrigger>
              <TabsTrigger value="scan">Bulk Scanning</TabsTrigger>
              <TabsTrigger value="sources">Source Database</TabsTrigger>
              <TabsTrigger value="settings">Detection Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="cases" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Cases List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Plagiarism Cases</h3>
                    <Button onClick={handleStartScan} disabled={isScanning} className="flex items-center gap-2">
                      <Search className="h-4 w-4" />
                      {isScanning ? "Scanning..." : "Scan All"}
                    </Button>
                  </div>

                  {isScanning && (
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Search className="h-4 w-4 text-blue-600 animate-pulse" />
                            <span className="text-sm font-medium">Scanning for plagiarism...</span>
                          </div>
                          <Progress value={scanProgress} className="w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="space-y-3">
                    {cases.map((plagCase) => (
                      <Card
                        key={plagCase.id}
                        className={`cursor-pointer transition-all ${
                          selectedCase === plagCase.id
                            ? "ring-2 ring-red-500 bg-red-50 dark:bg-red-900/20"
                            : "hover:shadow-md"
                        }`}
                        onClick={() => setSelectedCase(plagCase.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5" />
                              </div>
                              <div>
                                <h4 className="font-medium">{plagCase.studentName}</h4>
                                <p className="text-sm text-muted-foreground">ID: {plagCase.studentId}</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className={`text-lg font-bold ${getSimilarityColor(plagCase.similarityScore)}`}>
                                  {plagCase.similarityScore}%
                                </div>
                                <div className="text-xs text-muted-foreground">similarity</div>
                              </div>
                              <Badge className={`${getStatusColor(plagCase.status)} text-white text-xs`}>
                                {plagCase.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              {plagCase.matchedSources.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Globe className="h-3 w-3" />
                                  <span>{plagCase.matchedSources.length} web sources</span>
                                </div>
                              )}
                              {plagCase.matchedStudents.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>{plagCase.matchedStudents.length} student matches</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Case Details */}
                <div>
                  {selectedCaseData ? (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Case Details: {selectedCaseData.studentName}</CardTitle>
                        <CardDescription>Detected {selectedCaseData.detectedAt.toLocaleString()}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Similarity Score */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">Similarity Score</h4>
                            <Badge variant="outline" className={getSimilarityColor(selectedCaseData.similarityScore)}>
                              {selectedCaseData.similarityScore}%
                            </Badge>
                          </div>
                          <Progress value={selectedCaseData.similarityScore} className="w-full" />
                        </div>

                        {/* Matched Sources */}
                        {selectedCaseData.matchedSources.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Globe className="h-4 w-4" />
                              Matched Web Sources
                            </h4>
                            <div className="space-y-2">
                              {selectedCaseData.matchedSources.map((source, index) => (
                                <div key={index} className="text-sm p-2 bg-red-50 dark:bg-red-900/20 rounded">
                                  {source}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Matched Students */}
                        {selectedCaseData.matchedStudents.length > 0 && (
                          <div>
                            <h4 className="font-medium mb-2 flex items-center gap-2">
                              <Users className="h-4 w-4" />
                              Similar Student Responses
                            </h4>
                            <div className="space-y-2">
                              {selectedCaseData.matchedStudents.map((studentId, index) => (
                                <div key={index} className="text-sm p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
                                  Student ID: {studentId}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Actions */}
                        <div>
                          <h4 className="font-medium mb-2">Actions</h4>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleUpdateStatus(selectedCaseData.id, "confirmed")}
                              disabled={selectedCaseData.status === "confirmed"}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Confirm Plagiarism
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateStatus(selectedCaseData.id, "dismissed")}
                              disabled={selectedCaseData.status === "dismissed"}
                              className="bg-transparent"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Dismiss Case
                            </Button>
                          </div>
                        </div>

                        {selectedCaseData.status === "confirmed" && (
                          <Alert variant="destructive">
                            <AlertTriangle className="h-4 w-4" />
                            <AlertDescription>
                              This case has been confirmed as plagiarism. The student has been notified and appropriate
                              academic actions will be taken.
                            </AlertDescription>
                          </Alert>
                        )}

                        {selectedCaseData.status === "dismissed" && (
                          <Alert>
                            <CheckCircle className="h-4 w-4" />
                            <AlertDescription>
                              This case has been dismissed as a false positive. No further action is required.
                            </AlertDescription>
                          </Alert>
                        )}
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="p-12 text-center">
                        <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="font-medium mb-2">Select a Case</h3>
                        <p className="text-sm text-muted-foreground">
                          Choose a plagiarism case from the list to view detailed analysis and take action.
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="scan" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Bulk Plagiarism Scanning</CardTitle>
                  <CardDescription>Scan all responses for potential plagiarism</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-blue-50 dark:bg-blue-900/20">
                      <CardContent className="p-4 text-center">
                        <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">Responses to Scan</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-50 dark:bg-green-900/20">
                      <CardContent className="p-4 text-center">
                        <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">2.1M</div>
                        <div className="text-sm text-green-700 dark:text-green-300">Source Documents</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-purple-50 dark:bg-purple-900/20">
                      <CardContent className="p-4 text-center">
                        <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">98.5%</div>
                        <div className="text-sm text-purple-700 dark:text-purple-300">Detection Accuracy</div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-4">
                    <Button onClick={handleStartScan} disabled={isScanning} className="w-full">
                      <Search className="h-4 w-4 mr-2" />
                      {isScanning ? "Scanning in Progress..." : "Start Comprehensive Scan"}
                    </Button>

                    {isScanning && (
                      <div className="space-y-2">
                        <Progress value={scanProgress} className="w-full" />
                        <p className="text-sm text-center text-muted-foreground">
                          Scanning response {Math.floor((scanProgress / 100) * 156)} of 156...
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Web Sources
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Academic Papers</span>
                      <Badge variant="outline">847K documents</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Educational Websites</span>
                      <Badge variant="outline">1.2M pages</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Code Repositories</span>
                      <Badge variant="outline">156K repos</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Student Submissions</span>
                      <Badge variant="outline">89K responses</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      Detection Methods
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>Semantic Similarity</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Exact Text Matching</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Paraphrase Detection</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Cross-Student Analysis</span>
                      <Badge className="bg-green-500 text-white">Active</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Detection Configuration</CardTitle>
                  <CardDescription>Configure plagiarism detection sensitivity and thresholds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Similarity Threshold</label>
                        <input type="range" min="0" max="100" defaultValue="60" className="w-full mt-2" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>0%</span>
                          <span>60%</span>
                          <span>100%</span>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Minimum Match Length</label>
                        <input
                          type="number"
                          min="5"
                          max="50"
                          defaultValue="15"
                          className="w-full p-2 border rounded mt-2"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Detection Sensitivity</label>
                        <select className="w-full p-2 border rounded mt-2" defaultValue="high">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Auto-flag Threshold</label>
                        <input
                          type="number"
                          min="50"
                          max="100"
                          defaultValue="80"
                          className="w-full p-2 border rounded mt-2"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full">Save Detection Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
