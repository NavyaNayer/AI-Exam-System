import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Zap, Shield, BarChart3, FileSearch, Users, Target, Lightbulb } from "lucide-react"

export function AIRoleExplanation() {
  const aiComponents = [
    {
      title: "Intelligent Question Generation",
      icon: Lightbulb,
      color: "bg-yellow-500",
      description: "AI creates diverse, contextually relevant questions from curriculum content",
      features: [
        "Natural Language Processing for content analysis",
        "Difficulty level calibration based on learning objectives",
        "Multiple question format generation (MCQ, descriptive, numerical)",
        "Automatic question variation to prevent cheating",
      ],
      technology: "GPT-4, BERT, Custom NLP Models",
    },
    {
      title: "Automated Answer Evaluation",
      icon: Target,
      color: "bg-green-500",
      description: "AI evaluates student responses with human-level accuracy",
      features: [
        "Semantic understanding of student answers",
        "Partial credit assignment for incomplete answers",
        "Context-aware grading for descriptive responses",
        "Confidence scoring for manual review flagging",
      ],
      technology: "Transformer Models, Semantic Similarity, ML Classifiers",
    },
    {
      title: "Plagiarism & Integrity Detection",
      icon: Shield,
      color: "bg-red-500",
      description: "AI monitors exam integrity and detects academic dishonesty",
      features: [
        "Real-time answer similarity detection",
        "Behavioral pattern analysis during exams",
        "Cross-reference with online sources",
        "Suspicious activity flagging and alerts",
      ],
      technology: "Similarity Algorithms, Behavioral Analytics, Web Crawling",
    },
    {
      title: "Performance Analytics & Insights",
      icon: BarChart3,
      color: "bg-blue-500",
      description: "AI generates actionable insights from exam data",
      features: [
        "Individual student performance tracking",
        "Class-wide learning gap identification",
        "Question difficulty analysis and optimization",
        "Predictive analytics for student success",
      ],
      technology: "Statistical ML, Time Series Analysis, Predictive Modeling",
    },
    {
      title: "Adaptive Personalization",
      icon: Users,
      color: "bg-purple-500",
      description: "AI customizes exam experience for each student",
      features: [
        "Difficulty adjustment based on student history",
        "Learning style adaptation",
        "Accessibility accommodations",
        "Personalized feedback generation",
      ],
      technology: "Reinforcement Learning, User Modeling, Adaptive Algorithms",
    },
    {
      title: "Smart Proctoring System",
      icon: FileSearch,
      color: "bg-orange-500",
      description: "AI-powered remote monitoring ensures exam security",
      features: [
        "Facial recognition and identity verification",
        "Suspicious behavior detection",
        "Screen monitoring and tab switching alerts",
        "Audio analysis for unauthorized communication",
      ],
      technology: "Computer Vision, Audio Processing, Anomaly Detection",
    },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-purple-600" />
            AI Integration & Role in the System
          </CardTitle>
          <CardDescription>
            Comprehensive AI capabilities that transform traditional examination processes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {aiComponents.map((component, index) => {
              const IconComponent = component.icon
              return (
                <Card key={index} className="relative overflow-hidden">
                  <div className={`absolute top-0 left-0 w-1 h-full ${component.color}`} />
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${component.color} text-white`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{component.title}</CardTitle>
                          <CardDescription className="mt-1">{component.description}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        AI Core
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {component.features.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                              <div className="h-1.5 w-1.5 bg-current rounded-full mt-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium">Technology Stack:</span>
                          <Badge variant="secondary" className="text-xs">
                            {component.technology}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">95%</div>
            <div className="text-sm text-blue-700 dark:text-blue-300">Grading Accuracy</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">80%</div>
            <div className="text-sm text-green-700 dark:text-green-300">Time Reduction</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100%</div>
            <div className="text-sm text-purple-700 dark:text-purple-300">Paper Elimination</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border-orange-200 dark:border-orange-800">
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
            <div className="text-sm text-orange-700 dark:text-orange-300">System Availability</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
