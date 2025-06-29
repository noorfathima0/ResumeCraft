"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface DownloadButtonProps {
  onClick: () => void
}

export function DownloadButton({ onClick }: DownloadButtonProps) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 500, damping: 30 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        onClick={onClick}
        size="lg"
        className="rounded-full h-14 w-14 shadow-xl hover:shadow-2xl transition-all duration-300 bg-primary hover:bg-primary/90 group"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
          <Download className="h-6 w-6 group-hover:animate-bounce" />
        </motion.div>
      </Button>
    </motion.div>
  )
}
