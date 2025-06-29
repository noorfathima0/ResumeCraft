"use client"
import { useResumeStore } from "@/lib/resume-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { EnhancedTextarea } from "@/components/enhanced-textarea"
import { Plus, Trash2, Sparkles, GripVertical } from "lucide-react"
import type { Experience } from "@/lib/types"
import { motion, AnimatePresence } from "framer-motion"

export function ExperienceForm() {
  const { resumeData, addExperience, updateExperience, removeExperience } = useResumeStore()

  const handleAddExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: [],
    }
    addExperience(newExperience)
  }

  const handleUpdateExperience = (id: string, field: string, value: any) => {
    updateExperience(id, { [field]: value })
  }

  const handleDescriptionChange = (id: string, index: number, value: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id)
    if (experience) {
      const newDescription = [...experience.description]
      newDescription[index] = value
      updateExperience(id, { description: newDescription })
    }
  }

  const addDescriptionPoint = (id: string) => {
    const experience = resumeData.experience.find((exp) => exp.id === id)
    if (experience) {
      const newDescription = [...experience.description, ""]
      updateExperience(id, { description: newDescription })
    }
  }

  const removeDescriptionPoint = (id: string, index: number) => {
    const experience = resumeData.experience.find((exp) => exp.id === id)
    if (experience) {
      const newDescription = experience.description.filter((_, i) => i !== index)
      updateExperience(id, { description: newDescription })
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Work Experience</h3>
        <Button onClick={handleAddExperience} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Experience
        </Button>
      </div>

      <AnimatePresence>
        {resumeData.experience.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    Experience #{index + 1}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeExperience(exp.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Company</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                      placeholder="Company Name"
                    />
                  </div>
                  <div>
                    <Label>Position</Label>
                    <div className="flex gap-2">
                      <Input
                        value={exp.position}
                        onChange={(e) => handleUpdateExperience(exp.id, "position", e.target.value)}
                        placeholder="Job Title"
                      />
                      <Button variant="outline" size="sm">
                        <Sparkles className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Location</Label>
                  <Input
                    value={exp.location}
                    onChange={(e) => handleUpdateExperience(exp.id, "location", e.target.value)}
                    placeholder="City, State"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Start Date</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => handleUpdateExperience(exp.id, "startDate", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <Input
                      type="month"
                      value={exp.endDate}
                      onChange={(e) => handleUpdateExperience(exp.id, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`current-${exp.id}`}
                    checked={exp.current}
                    onCheckedChange={(checked) => handleUpdateExperience(exp.id, "current", checked)}
                  />
                  <Label htmlFor={`current-${exp.id}`}>I currently work here</Label>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Key Achievements & Responsibilities</Label>
                    <Button variant="outline" size="sm" onClick={() => addDescriptionPoint(exp.id)}>
                      <Plus className="h-3 w-3 mr-1" />
                      Add Point
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {exp.description.map((desc, descIndex) => (
                      <div key={descIndex} className="flex gap-2">
                        <EnhancedTextarea
                          value={desc}
                          onChange={(value) => handleDescriptionChange(exp.id, descIndex, value)}
                          placeholder="• Describe your achievement or responsibility..."
                          rows={2}
                          className="flex-1"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDescriptionPoint(exp.id, descIndex)}
                          className="px-2 text-destructive hover:text-destructive self-start mt-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>

      {resumeData.experience.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No work experience added yet</p>
            <Button onClick={handleAddExperience}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Experience
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
