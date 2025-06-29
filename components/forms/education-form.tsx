"use client"

import { useResumeStore } from "@/lib/resume-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical } from "lucide-react"
import type { Education } from "@/lib/types"

export function EducationForm() {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResumeStore()

  const handleAddEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: "",
      gpa: "",
    }
    addEducation(newEducation)
  }

  const handleUpdateEducation = (id: string, field: string, value: string) => {
    updateEducation(id, { [field]: value })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Education</h3>
        <Button onClick={handleAddEducation} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Education
        </Button>
      </div>

      {resumeData.education.map((edu, index) => (
        <Card key={edu.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                Education #{index + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Institution</Label>
              <Input
                value={edu.institution}
                onChange={(e) => handleUpdateEducation(edu.id, "institution", e.target.value)}
                placeholder="University Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => handleUpdateEducation(edu.id, "degree", e.target.value)}
                  placeholder="Bachelor of Science"
                />
              </div>
              <div>
                <Label>Field of Study</Label>
                <Input
                  value={edu.field}
                  onChange={(e) => handleUpdateEducation(edu.id, "field", e.target.value)}
                  placeholder="Computer Science"
                />
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={edu.location}
                onChange={(e) => handleUpdateEducation(edu.id, "location", e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input
                  type="month"
                  value={edu.startDate}
                  onChange={(e) => handleUpdateEducation(edu.id, "startDate", e.target.value)}
                />
              </div>
              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={edu.endDate}
                  onChange={(e) => handleUpdateEducation(edu.id, "endDate", e.target.value)}
                />
              </div>
              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa}
                  onChange={(e) => handleUpdateEducation(edu.id, "gpa", e.target.value)}
                  placeholder="3.8"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {resumeData.education.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No education added yet</p>
            <Button onClick={handleAddEducation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your Education
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
