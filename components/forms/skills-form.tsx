"use client"

import type React from "react"

import { useState } from "react"
import { useResumeStore } from "@/lib/resume-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Sparkles } from "lucide-react"

export function SkillsForm() {
  const { resumeData, updateSkills } = useResumeStore()
  const [newSkill, setNewSkill] = useState("")
  const [skillCategory, setSkillCategory] = useState<"technical" | "soft">("technical")

  const addSkill = () => {
    if (newSkill.trim()) {
      const updatedSkills = {
        ...resumeData.skills,
        [skillCategory]: [...resumeData.skills[skillCategory], newSkill.trim()],
      }
      updateSkills(updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (category: "technical" | "soft", skillToRemove: string) => {
    const updatedSkills = {
      ...resumeData.skills,
      [category]: resumeData.skills[category].filter((skill) => skill !== skillToRemove),
    }
    updateSkills(updatedSkills)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addSkill()
    }
  }

  const suggestedTechnicalSkills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "SQL",
    "AWS",
    "Docker",
    "Git",
  ]

  const suggestedSoftSkills = [
    "Leadership",
    "Communication",
    "Problem Solving",
    "Team Collaboration",
    "Project Management",
    "Critical Thinking",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Technical Skills
            <Button variant="outline" size="sm" className="ml-auto bg-transparent">
              <Sparkles className="h-3 w-3 mr-1" />
              AI Suggestions
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillCategory === "technical" ? newSkill : ""}
              onChange={(e) => {
                setNewSkill(e.target.value)
                setSkillCategory("technical")
              }}
              onKeyPress={handleKeyPress}
              placeholder="Add a technical skill..."
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resumeData.skills.technical.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill("technical", skill)}
                />
              </Badge>
            ))}
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Suggested Skills:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedTechnicalSkills
                .filter((skill) => !resumeData.skills.technical.includes(skill))
                .map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      const updatedSkills = {
                        ...resumeData.skills,
                        technical: [...resumeData.skills.technical, skill],
                      }
                      updateSkills(updatedSkills)
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Soft Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={skillCategory === "soft" ? newSkill : ""}
              onChange={(e) => {
                setNewSkill(e.target.value)
                setSkillCategory("soft")
              }}
              onKeyPress={handleKeyPress}
              placeholder="Add a soft skill..."
            />
            <Button onClick={addSkill} disabled={!newSkill.trim()}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            {resumeData.skills.soft.map((skill, index) => (
              <Badge key={index} variant="secondary" className="flex items-center gap-1">
                {skill}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-destructive"
                  onClick={() => removeSkill("soft", skill)}
                />
              </Badge>
            ))}
          </div>

          <div>
            <Label className="text-sm text-muted-foreground">Suggested Skills:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestedSoftSkills
                .filter((skill) => !resumeData.skills.soft.includes(skill))
                .map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                    onClick={() => {
                      const updatedSkills = {
                        ...resumeData.skills,
                        soft: [...resumeData.skills.soft, skill],
                      }
                      updateSkills(updatedSkills)
                    }}
                  >
                    {skill}
                  </Badge>
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
