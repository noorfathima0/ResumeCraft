"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon, QrCode, CheckCircle } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"
import { generatePDF, generatePNG, generateQRCode } from "@/lib/export-utils"

export function ExportPanel() {
  const { resumeData } = useResumeStore()
  const [isExporting, setIsExporting] = useState(false)
  const [atsScore, setAtsScore] = useState(85) // Mock ATS score

  const handleExportPDF = async () => {
    setIsExporting(true)
    try {
      await generatePDF()
    } catch (error) {
      console.error("PDF export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleExportPNG = async () => {
    setIsExporting(true)
    try {
      await generatePNG()
    } catch (error) {
      console.error("PNG export failed:", error)
    } finally {
      setIsExporting(false)
    }
  }

  const handleGenerateQR = async () => {
    try {
      await generateQRCode(resumeData)
    } catch (error) {
      console.error("QR generation failed:", error)
    }
  }

  return (
    <Card>
      <CardContent className="p-3 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Export Resume</span>
          <Badge variant={atsScore >= 80 ? "default" : "secondary"} className="text-xs">
            <CheckCircle className="h-3 w-3 mr-1" />
            ATS: {atsScore}%
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" onClick={handleExportPDF} disabled={isExporting} className="text-xs">
            <FileText className="h-3 w-3 mr-1" />
            PDF
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={handleExportPNG}
            disabled={isExporting}
            className="text-xs bg-transparent"
          >
            <ImageIcon className="h-3 w-3 mr-1" />
            PNG
          </Button>
        </div>

        <Button size="sm" variant="outline" onClick={handleGenerateQR} className="w-full text-xs bg-transparent">
          <QrCode className="h-3 w-3 mr-1" />
          Generate QR Link
        </Button>
      </CardContent>
    </Card>
  )
}
