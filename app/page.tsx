"use client"

import { useState } from "react"
import { ResumeBuilder } from "@/components/resume-builder"
import { ResumePreview } from "@/components/resume-preview"
import { Header } from "@/components/header"
import { SaveStatus } from "@/components/save-status"
import { DownloadButton } from "@/components/download-button"
import { ExportModal } from "@/components/export-modal"
import { useResumeStore } from "@/lib/resume-store"
import { Button } from "@/components/ui/button"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import ChatBot from "@/components/ChatBot";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [showExportModal, setShowExportModal] = useState(false)
  const { resumeData } = useResumeStore()

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SaveStatus />

      <div className="flex h-[calc(100vh-64px)] relative">
        {/* Left Sidebar - Form */}
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ width: sidebarCollapsed ? 0 : "50%" }}
            animate={{ width: sidebarCollapsed ? 0 : "50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-r border-border bg-card/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="h-full flex flex-col">
              {/* Sidebar Header */}
              <div className="p-6 border-b border-border bg-background/80 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-lg font-semibold"
                  >
                    Resume Builder
                  </motion.h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hover:bg-accent"
                  >
                    <PanelLeftClose className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Form Content */}
              <div className="flex-1 overflow-y-auto">
                <ResumeBuilder />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Collapse/Expand Button */}
        <AnimatePresence>
          {sidebarCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSidebarCollapsed(false)}
                className="rounded-l-none shadow-lg bg-background/95 backdrop-blur-sm"
              >
                <PanelLeftOpen className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side - Preview */}
        <motion.div
          initial={{ width: sidebarCollapsed ? "100%" : "50%" }}
          animate={{ width: sidebarCollapsed ? "100%" : "50%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-muted/20 relative"
        >
          <div className="h-full overflow-y-auto p-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <ResumePreview />
            </motion.div>
          </div>
        </motion.div>

        {/* Sticky Download Button */}
        <DownloadButton onClick={() => setShowExportModal(true)} />
      </div>

      {/* Export Modal */}
      <ExportModal open={showExportModal} onOpenChange={setShowExportModal} />
      <ChatBot />
    </div>
  )
}
