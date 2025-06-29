"use client"

import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import type { ResumeData } from "./types"

export const generatePDF = async () => {
  const element = document.getElementById("resume-preview")
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = pdf.internal.pageSize.getHeight()
    const imgWidth = canvas.width
    const imgHeight = canvas.height
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
    const imgX = (pdfWidth - imgWidth * ratio) / 2
    const imgY = 0

    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio)
    pdf.save("resume.pdf")
  } catch (error) {
    console.error("Error generating PDF:", error)
  }
}

export const generatePNG = async () => {
  const element = document.getElementById("resume-preview")
  if (!element) return

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    })

    const link = document.createElement("a")
    link.download = "resume.png"
    link.href = canvas.toDataURL()
    link.click()
  } catch (error) {
    console.error("Error generating PNG:", error)
  }
}

export const generateQRCode = async (resumeData: ResumeData) => {
  // Mock QR code generation - in real app, you'd upload resume and get a shareable link
  const mockUrl = `https://resumecraft.pro/view/${Date.now()}`

  // For now, just copy to clipboard
  try {
    await navigator.clipboard.writeText(mockUrl)
    alert(`Resume link copied to clipboard: ${mockUrl}`)
  } catch (error) {
    console.error("Error generating QR code:", error)
  }
}
