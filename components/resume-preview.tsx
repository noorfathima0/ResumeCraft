"use client"

import { motion } from "framer-motion"
import { useResumeStore } from "@/lib/resume-store"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Palette } from "lucide-react"
import { TemplateSelector } from "@/components/template-selector"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { TechTemplate } from "@/components/templates/tech-template"

export function ResumePreview() {
  const { resumeData, selectedTemplate } = useResumeStore()

  const renderTemplate = () => {
    switch (selectedTemplate) {
      case "modern":
        return <ModernTemplate data={resumeData} />
      case "classic":
        return <ClassicTemplate data={resumeData} />
      case "minimal":
        return <MinimalTemplate data={resumeData} />
      case "creative":
        return <CreativeTemplate data={resumeData} />
      case "executive":
        return <ExecutiveTemplate data={resumeData} />
      case "tech":
        return <TechTemplate data={resumeData} />
      default:
        return <ModernTemplate data={resumeData} />
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Preview Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10 text-primary">
            <Eye className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Live Preview</h2>
            <p className="text-sm text-muted-foreground">Updates in real-time as you edit</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Palette className="h-3 w-3" />
            {selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}
          </Badge>
          <TemplateSelector />
        </div>
      </motion.div>

      {/* Resume Preview Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="p-8 bg-white text-black shadow-xl border-0 overflow-hidden" id="resume-preview">
          <motion.div
            key={selectedTemplate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderTemplate()}
          </motion.div>
        </Card>
      </motion.div>

      {/* Preview Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground"
      >
        <p>This preview shows how your resume will appear when exported</p>
      </motion.div>
    </div>
  )
}
