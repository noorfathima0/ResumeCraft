"use client"

import { useResumeStore } from "@/lib/resume-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Trash2, GripVertical, ExternalLink } from "lucide-react"
import type { Project } from "@/lib/types"

export function ProjectsForm() {
  const { resumeData, addProject, updateProject, removeProject } = useResumeStore()

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
    }
    addProject(newProject)
  }

  const handleUpdateProject = (id: string, field: string, value: any) => {
    updateProject(id, { [field]: value })
  }

  const handleTechnologiesChange = (id: string, value: string) => {
    const technologies = value
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech)
    updateProject(id, { technologies })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Projects</h3>
        <Button onClick={handleAddProject} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {resumeData.projects.map((project, index) => (
        <Card key={project.id}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                Project #{index + 1}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Project Name</Label>
              <Input
                value={project.name}
                onChange={(e) => handleUpdateProject(project.id, "name", e.target.value)}
                placeholder="My Awesome Project"
              />
            </div>

            <div>
              <Label>Description</Label>
              <Textarea
                value={project.description}
                onChange={(e) => handleUpdateProject(project.id, "description", e.target.value)}
                placeholder="Describe what this project does and your role in it..."
                rows={3}
              />
            </div>

            <div>
              <Label>Technologies Used</Label>
              <Input
                value={project.technologies.join(", ")}
                onChange={(e) => handleTechnologiesChange(project.id, e.target.value)}
                placeholder="React, Node.js, MongoDB, AWS (comma-separated)"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Live Demo Link</Label>
                <div className="flex gap-2">
                  <Input
                    value={project.link}
                    onChange={(e) => handleUpdateProject(project.id, "link", e.target.value)}
                    placeholder="https://myproject.com"
                  />
                  {project.link && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              <div>
                <Label>GitHub Repository</Label>
                <div className="flex gap-2">
                  <Input
                    value={project.github}
                    onChange={(e) => handleUpdateProject(project.id, "github", e.target.value)}
                    placeholder="https://github.com/username/repo"
                  />
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {resumeData.projects.length === 0 && (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <p className="text-muted-foreground mb-4">No projects added yet</p>
            <Button onClick={handleAddProject}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Project
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
