"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useResumeStore } from "@/lib/resume-store"
import { ModernTemplate } from "@/components/templates/modern-template"
import { ClassicTemplate } from "@/components/templates/classic-template"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { ExecutiveTemplate } from "@/components/templates/executive-template"
import { TechTemplate } from "@/components/templates/tech-template"
import { Eye, Check, Sparkles, Palette, Star, Zap, Crown, Code } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface TemplateGalleryProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface TemplateOption {
  id: string
  name: string
  description: string
  category: "Professional" | "Creative" | "Technical" | "Executive"
  icon: React.ComponentType<{ className?: string }>
  component: React.ComponentType<{ data: ResumeData }>
  features: string[]
  popular?: boolean
  premium?: boolean
  atsScore: number
  preview: string
}

const templates: TemplateOption[] = [
  {
    id: "modern",
    name: "Modern Professional",
    description: "Clean design with subtle color accents and modern typography",
    category: "Professional",
    icon: Sparkles,
    component: ModernTemplate,
    features: ["ATS-Friendly", "Color Accents", "Modern Typography", "Clean Layout"],
    popular: true,
    atsScore: 95,
    preview: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "classic",
    name: "Classic Traditional",
    description: "Timeless format perfect for conservative industries",
    category: "Professional",
    icon: Star,
    component: ClassicTemplate,
    features: ["Traditional Format", "High ATS Score", "Conservative Design", "Print-Friendly"],
    atsScore: 98,
    preview: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "minimal",
    name: "Minimal Elegant",
    description: "Simple and elegant design focusing on content clarity",
    category: "Professional",
    icon: Zap,
    component: MinimalTemplate,
    features: ["Minimal Design", "Content Focus", "Clean Typography", "Elegant Spacing"],
    atsScore: 92,
    preview: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "creative",
    name: "Creative Designer",
    description: "Bold design for creative professionals and designers",
    category: "Creative",
    icon: Palette,
    component: CreativeTemplate,
    features: ["Creative Layout", "Visual Elements", "Portfolio Section", "Color Schemes"],
    premium: true,
    atsScore: 78,
    preview: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "executive",
    name: "Executive Leadership",
    description: "Sophisticated design for senior-level positions",
    category: "Executive",
    icon: Crown,
    component: ExecutiveTemplate,
    features: ["Executive Format", "Leadership Focus", "Achievement Highlights", "Premium Design"],
    premium: true,
    atsScore: 89,
    preview: "/placeholder.svg?height=400&width=300",
  },
  {
    id: "tech",
    name: "Tech Developer",
    description: "Optimized for software developers and tech professionals",
    category: "Technical",
    icon: Code,
    component: TechTemplate,
    features: ["Tech-Focused", "Skills Showcase", "Project Highlights", "GitHub Integration"],
    atsScore: 91,
    preview: "/placeholder.svg?height=400&width=300",
  },
]

const categories = ["All", "Professional", "Creative", "Technical", "Executive"] as const

export function TemplateGallery({ open, onOpenChange }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<(typeof categories)[number]>("All")
  const [previewTemplate, setPreviewTemplate] = useState<string | null>(null)
  const [hoveredTemplate, setHoveredTemplate] = useState<string | null>(null)
  const { resumeData, selectedTemplate, setSelectedTemplate } = useResumeStore()

  const filteredTemplates = templates.filter(
    (template) => selectedCategory === "All" || template.category === selectedCategory,
  )

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    onOpenChange(false)
  }

  const handlePreviewTemplate = (templateId: string) => {
    setPreviewTemplate(templateId)
  }

  const previewTemplateData = templates.find((t) => t.id === previewTemplate)

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Choose Your Template
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            {/* Category Filter */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                  {category !== "All" && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {templates.filter((t) => t.category === category).length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>

            {/* Template Grid */}
            <div className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                <AnimatePresence>
                  {filteredTemplates.map((template, index) => {
                    const Icon = template.icon
                    const isSelected = selectedTemplate === template.id
                    const isHovered = hoveredTemplate === template.id

                    return (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        onHoverStart={() => setHoveredTemplate(template.id)}
                        onHoverEnd={() => setHoveredTemplate(null)}
                      >
                        <Card
                          className={`
                          relative overflow-hidden cursor-pointer transition-all duration-300
                          ${isSelected ? "ring-2 ring-primary shadow-lg" : "hover:shadow-lg"}
                          ${template.premium ? "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950" : ""}
                        `}
                        >
                          {/* Template Preview */}
                          <div className="relative aspect-[3/4] bg-white overflow-hidden">
                            <div className="absolute inset-0 scale-[0.4] origin-top-left transform-gpu">
                              <template.component data={resumeData} />
                            </div>

                            {/* Overlay */}
                            <div
                              className={`
                              absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300
                              flex items-center justify-center
                              ${isHovered ? "bg-black/10" : ""}
                            `}
                            >
                              <AnimatePresence>
                                {isHovered && (
                                  <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className="flex gap-2"
                                  >
                                    <Button
                                      size="sm"
                                      variant="secondary"
                                      onClick={() => handlePreviewTemplate(template.id)}
                                      className="bg-white/90 hover:bg-white text-black"
                                    >
                                      <Eye className="h-3 w-3 mr-1" />
                                      Preview
                                    </Button>
                                    <Button
                                      size="sm"
                                      onClick={() => handleSelectTemplate(template.id)}
                                      className="bg-primary/90 hover:bg-primary"
                                    >
                                      {isSelected ? (
                                        <>
                                          <Check className="h-3 w-3 mr-1" />
                                          Selected
                                        </>
                                      ) : (
                                        "Select"
                                      )}
                                    </Button>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            {/* Badges */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                              {template.popular && <Badge className="bg-green-500 text-white text-xs">Popular</Badge>}
                              {template.premium && <Badge className="bg-amber-500 text-white text-xs">Premium</Badge>}
                            </div>

                            {/* ATS Score */}
                            <div className="absolute top-2 right-2">
                              <Badge
                                variant="secondary"
                                className={`text-xs ${
                                  template.atsScore >= 90
                                    ? "bg-green-100 text-green-800"
                                    : template.atsScore >= 80
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                }`}
                              >
                                ATS {template.atsScore}%
                              </Badge>
                            </div>
                          </div>

                          {/* Template Info */}
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Icon className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
                                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                                  {template.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-1">
                                  {template.features.slice(0, 2).map((feature) => (
                                    <Badge key={feature} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                  {template.features.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{template.features.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Full Preview Modal */}
      <Dialog open={!!previewTemplate} onOpenChange={() => setPreviewTemplate(null)}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                {previewTemplateData?.name} Preview
              </DialogTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setPreviewTemplate(null)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (previewTemplate) {
                      handleSelectTemplate(previewTemplate)
                    }
                  }}
                >
                  <Check className="h-3 w-3 mr-1" />
                  Use This Template
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto">
            {previewTemplateData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-lg shadow-lg"
              >
                <previewTemplateData.component data={resumeData} />
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
