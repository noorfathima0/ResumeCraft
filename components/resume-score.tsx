"use client"

import { useResumeStore } from "@/lib/resume-store"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, XCircle } from "lucide-react"

export function ResumeScore() {
  const { resumeData } = useResumeStore()

  const calculateScore = () => {
    let score = 0
    const maxScore = 100
    const issues = []
    const suggestions = []

    // Personal Info (20 points)
    if (resumeData.personalInfo.firstName && resumeData.personalInfo.lastName) score += 5
    else issues.push("Add your full name")

    if (resumeData.personalInfo.email) score += 5
    else issues.push("Add your email address")

    if (resumeData.personalInfo.phone) score += 5
    else issues.push("Add your phone number")

    if (resumeData.personalInfo.title) score += 5
    else suggestions.push("Add a professional title")

    // Summary (15 points)
    if (resumeData.personalInfo.summary) {
      if (resumeData.personalInfo.summary.length > 50) score += 15
      else if (resumeData.personalInfo.summary.length > 20) score += 10
      else score += 5
    } else {
      issues.push("Add a professional summary")
    }

    // Experience (30 points)
    if (resumeData.experience.length > 0) {
      score += 15
      const hasDescriptions = resumeData.experience.some((exp) => exp.description.length > 0)
      if (hasDescriptions) score += 15
      else suggestions.push("Add descriptions to your work experience")
    } else {
      issues.push("Add work experience")
    }

    // Education (15 points)
    if (resumeData.education.length > 0) score += 15
    else suggestions.push("Add your education")

    // Skills (10 points)
    if (resumeData.skills.technical.length > 0) score += 5
    else suggestions.push("Add technical skills")

    if (resumeData.skills.soft.length > 0) score += 5
    else suggestions.push("Add soft skills")

    // Projects (10 points)
    if (resumeData.projects.length > 0) score += 10
    else suggestions.push("Add projects to showcase your work")

    return { score, issues, suggestions }
  }

  const { score, issues, suggestions } = calculateScore()
  const scoreColor = score >= 80 ? "text-green-600" : score >= 60 ? "text-yellow-600" : "text-red-600"
  const progressColor = score >= 80 ? "bg-green-600" : score >= 60 ? "bg-yellow-600" : "bg-red-600"

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Resume Score</span>
          <span className={`text-lg font-bold ${scoreColor}`}>{score}/100</span>
        </div>

        <Progress value={score} className="mb-3" />

        <div className="space-y-2">
          {issues.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <XCircle className="h-3 w-3 text-red-500" />
                <span className="text-xs font-medium text-red-700">Issues ({issues.length})</span>
              </div>
              {issues.slice(0, 2).map((issue, index) => (
                <Badge key={index} variant="destructive" className="text-xs mr-1 mb-1">
                  {issue}
                </Badge>
              ))}
            </div>
          )}

          {suggestions.length > 0 && (
            <div>
              <div className="flex items-center gap-1 mb-1">
                <AlertCircle className="h-3 w-3 text-yellow-500" />
                <span className="text-xs font-medium text-yellow-700">Suggestions ({suggestions.length})</span>
              </div>
              {suggestions.slice(0, 2).map((suggestion, index) => (
                <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                  {suggestion}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
