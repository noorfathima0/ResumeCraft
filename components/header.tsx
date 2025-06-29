"use client"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Save, Share2, Sparkles } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"
import { TemplateGalleryTrigger } from "@/components/template-gallery-trigger"

export function Header() {
  const { saveResume, resumeData } = useResumeStore()

  return (
    <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">ResumeCraft Pro</h1>
        </div>

        <div className="flex items-center space-x-2">
          <TemplateGalleryTrigger />
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
