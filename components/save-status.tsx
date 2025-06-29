"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Loader2, WifiOff } from "lucide-react"
import { useResumeStore } from "@/lib/resume-store"

export function SaveStatus() {
  const [saveStatus, setSaveStatus] = useState<"saved" | "saving" | "error">("saved")
  const [isOnline, setIsOnline] = useState(true)
  const { resumeData } = useResumeStore()

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    setSaveStatus("saving")
    const timer = setTimeout(() => {
      setSaveStatus("saved")
    }, 800)

    return () => clearTimeout(timer)
  }, [resumeData])

  const getStatusConfig = () => {
    if (!isOnline) {
      return {
        icon: WifiOff,
        text: "Offline - Changes saved locally",
        className: "bg-yellow-500/10 text-yellow-600 border-yellow-200 dark:border-yellow-800",
      }
    }

    switch (saveStatus) {
      case "saving":
        return {
          icon: Loader2,
          text: "Saving changes...",
          className: "bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-800",
          animate: true,
        }
      case "error":
        return {
          icon: WifiOff,
          text: "Failed to save",
          className: "bg-red-500/10 text-red-600 border-red-200 dark:border-red-800",
        }
      default:
        return {
          icon: CheckCircle,
          text: "All changes saved",
          className: "bg-green-500/10 text-green-600 border-green-200 dark:border-green-800",
        }
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="fixed top-16 left-1/2 transform -translate-x-1/2 z-50"
      >
        <div
          className={`
          flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-sm
          text-sm font-medium shadow-lg
          ${config.className}
        `}
        >
          <Icon className={`h-4 w-4 ${config.animate ? "animate-spin" : ""}`} />
          <span>{config.text}</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
