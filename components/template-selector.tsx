"use client"

import { useResumeStore } from "@/lib/resume-store"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Check } from "lucide-react"

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useResumeStore()

  const templates = [
    { id: "modern", name: "Modern", description: "Clean with color accents" },
    { id: "classic", name: "Classic", description: "Traditional ATS-friendly" },
    { id: "minimal", name: "Minimal", description: "Simple and elegant" },
  ]

  const currentTemplate = templates.find((t) => t.id === selectedTemplate)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentTemplate?.name || "Select Template"}
          <ChevronDown className="h-4 w-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {templates.map((template) => (
          <DropdownMenuItem
            key={template.id}
            onClick={() => setSelectedTemplate(template.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div>
              <div className="font-medium">{template.name}</div>
              <div className="text-xs text-muted-foreground">{template.description}</div>
            </div>
            {selectedTemplate === template.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
