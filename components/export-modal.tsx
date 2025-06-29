"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, FileType, QrCode, CheckCircle, Download, Loader2 } from "lucide-react"
import { generatePDF, generatePNG, generateQRCode } from "@/lib/export-utils"
import { useResumeStore } from "@/lib/resume-store"

interface ExportModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ExportModal({ open, onOpenChange }: ExportModalProps) {
  const [isExporting, setIsExporting] = useState<string | null>(null)
  const [atsScore] = useState(87) // Mock ATS score
  const { resumeData } = useResumeStore()

  const exportOptions = [
    {
      id: "pdf",
      title: "PDF Document",
      description: "Perfect for job applications and printing",
      icon: FileText,
      action: generatePDF,
      primary: true,
    },
    {
      id: "png",
      title: "PNG Image",
      description: "Great for social media and portfolios",
      icon: ImageIcon,
      action: generatePNG,
    },
    {
      id: "docx",
      title: "Word Document",
      description: "Editable format for further customization",
      icon: FileType,
      action: () => Promise.resolve(), // Placeholder
      disabled: true,
    },
    {
      id: "qr",
      title: "QR Code Link",
      description: "Shareable digital resume link",
      icon: QrCode,
      action: () => generateQRCode(resumeData),
    },
  ]

  const handleExport = async (option: (typeof exportOptions)[0]) => {
    if (option.disabled) return

    setIsExporting(option.id)
    try {
      await option.action()
    } catch (error) {
      console.error(`Export failed:`, error)
    } finally {
      setIsExporting(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Resume
          </DialogTitle>
        </DialogHeader>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* ATS Score */}
          <Card className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">ATS Compatibility</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                >
                  {atsScore}% Compatible
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Your resume is optimized for Applicant Tracking Systems
              </p>
            </CardContent>
          </Card>

          {/* Export Options */}
          <div className="grid gap-3">
            {exportOptions.map((option, index) => {
              const Icon = option.icon
              const isLoading = isExporting === option.id

              return (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className={`
                    cursor-pointer transition-all duration-200 hover:shadow-md
                    ${option.primary ? "ring-2 ring-primary/20 bg-primary/5" : ""}
                    ${option.disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-accent/50"}
                  `}
                  >
                    <CardContent className="p-4">
                      <Button
                        variant="ghost"
                        className="w-full h-auto p-0 justify-start"
                        onClick={() => handleExport(option)}
                        disabled={option.disabled || isLoading}
                      >
                        <div className="flex items-center gap-3 w-full">
                          <div
                            className={`
                            p-2 rounded-lg
                            ${option.primary ? "bg-primary text-primary-foreground" : "bg-muted"}
                          `}
                          >
                            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Icon className="h-5 w-5" />}
                          </div>
                          <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{option.title}</h3>
                              {option.primary && (
                                <Badge variant="secondary" className="text-xs">
                                  Recommended
                                </Badge>
                              )}
                              {option.disabled && (
                                <Badge variant="outline" className="text-xs">
                                  Coming Soon
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="text-center pt-2">
            <p className="text-xs text-muted-foreground">
              All exports maintain professional formatting and ATS compatibility
            </p>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  )
}
