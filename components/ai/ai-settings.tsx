"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Brain,
  Settings,
  Zap,
  Shield,
  Target,
  BarChart3,
  Cpu,
  Database,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export function AISettings() {
  const [settings, setSettings] = useState({
    model: "gpt-4",
    creativity: [0.7],
    difficulty: [0.5],
    questionVariety: [0.8],
    contextAwareness: [0.9],
    plagiarismSensitivity: [0.8],
    autoApproval: false,
    batchSize: 10,
    timeout: 30,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const models = [
    { id: "gpt-4", name: "GPT-4", description: "Most advanced, best for complex questions", status: "active" },
    {
      id: "gpt-3.5",
      name: "GPT-3.5 Turbo",
      description: "Fast and efficient, good for simple questions",
      status: "active",
    },
    { id: "claude-3", name: "Claude-3", description: "Excellent for analytical questions", status: "active" },
    { id: "custom", name: "Custom Model", description: "Your fine-tuned model", status: "training" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" />
            AI Configuration
          </CardTitle>
          <CardDescription>Configure AI models and generation parameters for optimal question quality</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="models" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="models">AI Models</TabsTrigger>
              <TabsTrigger value="generation">Generation</TabsTrigger>
              <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="models" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Available AI Models</h3>
                <div className="space-y-4">
                  {models.map((model) => (
                    <Card
                      key={model.id}
                      className={`cursor-pointer transition-all ${
                        settings.model === model.id
                          ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "hover:shadow-md"
                      }`}
                      onClick={() => setSettings({ ...settings, model: model.id })}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Brain className="h-5 w-5 text-purple-600" />
                              <div>
                                <h4 className="font-medium">{model.name}</h4>
                                <p className="text-sm text-muted-foreground">{model.description}</p>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={model.status === "active" ? "default" : "secondary"}
                              className={
                                model.status === "active"
                                  ? "bg-green-500 text-white"
                                  : model.status === "training"
                                    ? "bg-yellow-500 text-white"
                                    : ""
                              }
                            >
                              {model.status}
                            </Badge>
                            {settings.model === model.id && <CheckCircle className="h-5 w-5 text-blue-600" />}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <Input id="apiKey" type="password" placeholder="Enter your API key" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Custom Endpoint</Label>
                  <Input id="endpoint" placeholder="https://api.example.com/v1" />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="generation" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="creativity">Creativity Level</Label>
                    <Badge variant="outline">{(settings.creativity[0] * 100).toFixed(0)}%</Badge>
                  </div>
                  <Slider
                    id="creativity"
                    min={0}
                    max={1}
                    step={0.1}
                    value={settings.creativity}
                    onValueChange={(value) => setSettings({ ...settings, creativity: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Higher values generate more creative and varied questions
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="difficulty">Difficulty Calibration</Label>
                    <Badge variant="outline">{(settings.difficulty[0] * 100).toFixed(0)}%</Badge>
                  </div>
                  <Slider
                    id="difficulty"
                    min={0}
                    max={1}
                    step={0.1}
                    value={settings.difficulty}
                    onValueChange={(value) => setSettings({ ...settings, difficulty: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Adjusts the baseline difficulty of generated questions
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="variety">Question Variety</Label>
                    <Badge variant="outline">{(settings.questionVariety[0] * 100).toFixed(0)}%</Badge>
                  </div>
                  <Slider
                    id="variety"
                    min={0}
                    max={1}
                    step={0.1}
                    value={settings.questionVariety}
                    onValueChange={(value) => setSettings({ ...settings, questionVariety: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Controls diversity in question types and formats</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="context">Context Awareness</Label>
                    <Badge variant="outline">{(settings.contextAwareness[0] * 100).toFixed(0)}%</Badge>
                  </div>
                  <Slider
                    id="context"
                    min={0}
                    max={1}
                    step={0.1}
                    value={settings.contextAwareness}
                    onValueChange={(value) => setSettings({ ...settings, contextAwareness: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    How well AI considers curriculum context and learning objectives
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size</Label>
                    <Input
                      id="batchSize"
                      type="number"
                      min="1"
                      max="50"
                      value={settings.batchSize}
                      onChange={(e) => setSettings({ ...settings, batchSize: Number.parseInt(e.target.value) || 10 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeout">Timeout (seconds)</Label>
                    <Input
                      id="timeout"
                      type="number"
                      min="10"
                      max="300"
                      value={settings.timeout}
                      onChange={(e) => setSettings({ ...settings, timeout: Number.parseInt(e.target.value) || 30 })}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoApproval">Auto-approve high-confidence questions</Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve questions with confidence score above 90%
                    </p>
                  </div>
                  <Switch
                    id="autoApproval"
                    checked={settings.autoApproval}
                    onCheckedChange={(checked) => setSettings({ ...settings, autoApproval: checked })}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="evaluation" className="space-y-6">
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Label htmlFor="plagiarism">Plagiarism Detection Sensitivity</Label>
                    <Badge variant="outline">{(settings.plagiarismSensitivity[0] * 100).toFixed(0)}%</Badge>
                  </div>
                  <Slider
                    id="plagiarism"
                    min={0}
                    max={1}
                    step={0.1}
                    value={settings.plagiarismSensitivity}
                    onValueChange={(value) => setSettings({ ...settings, plagiarismSensitivity: value })}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Higher values detect more subtle forms of plagiarism
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-green-50 dark:bg-green-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Target className="h-5 w-5 text-green-600" />
                        <h4 className="font-medium">Evaluation Accuracy</h4>
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-1">94.7%</div>
                      <p className="text-sm text-green-700 dark:text-green-300">Average accuracy across all subjects</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-50 dark:bg-blue-900/20">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-5 w-5 text-blue-600" />
                        <h4 className="font-medium">Processing Speed</h4>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">2.3s</div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">Average time per question</p>
                    </CardContent>
                  </Card>
                </div>

                <Alert>
                  <Shield className="h-4 w-4" />
                  <AlertDescription>
                    All AI evaluations are logged and can be reviewed by faculty members for quality assurance.
                  </AlertDescription>
                </Alert>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-purple-50 dark:bg-purple-900/20">
                  <CardContent className="p-4 text-center">
                    <Cpu className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-purple-600">87%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">CPU Usage</div>
                  </CardContent>
                </Card>
                <Card className="bg-orange-50 dark:bg-orange-900/20">
                  <CardContent className="p-4 text-center">
                    <Database className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-orange-600">2.1GB</div>
                    <div className="text-sm text-orange-700 dark:text-orange-300">Memory Usage</div>
                  </CardContent>
                </Card>
                <Card className="bg-teal-50 dark:bg-teal-900/20">
                  <CardContent className="p-4 text-center">
                    <BarChart3 className="h-8 w-8 text-teal-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-teal-600">1,247</div>
                    <div className="text-sm text-teal-700 dark:text-teal-300">Questions/Hour</div>
                  </CardContent>
                </Card>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  High CPU usage detected. Consider upgrading your plan for better performance during peak hours.
                </AlertDescription>
              </Alert>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      {
                        time: "2 minutes ago",
                        action: "Generated 25 questions for Computer Science",
                        status: "success",
                      },
                      { time: "15 minutes ago", action: "Evaluated 45 student responses", status: "success" },
                      { time: "1 hour ago", action: "Detected potential plagiarism in 3 responses", status: "warning" },
                      { time: "2 hours ago", action: "Updated question difficulty calibration", status: "info" },
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.status === "success"
                              ? "bg-green-500"
                              : activity.status === "warning"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6 border-t">
            <Button onClick={handleSave} disabled={isLoading} className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
