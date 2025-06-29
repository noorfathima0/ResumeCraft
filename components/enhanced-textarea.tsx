"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface EnhancedTextareaProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  className?: string
}

export function EnhancedTextarea({ value, onChange, placeholder, rows = 2, className }: EnhancedTextareaProps) {
  const [showEnhancer, setShowEnhancer] = useState(false)
  const [enhancerPosition, setEnhancerPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleEnhanceClick = (event: React.MouseEvent) => {
    if (!value.trim()) return

    const rect = event.currentTarget.getBoundingClientRect()
    setEnhancerPosition({
      x: rect.right + 10,
      y: rect.top,
    })
    setShowEnhancer(true)
  }

  const handleAcceptEnhancement = (enhancedText: string) => {
    onChange(enhancedText)
    setShowEnhancer(false)
  }

  const handleCloseEnhancer = () => {
    setShowEnhancer(false)
  }

  return (
    <>
      <div className="relative group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${className} pr-12`}
        />

        <AnimatePresence>
          {(isHovered || showEnhancer) && value.trim() && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-2 right-2"
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={handleEnhanceClick}
                className="h-8 w-8 p-0 bg-primary/10 hover:bg-primary/20 text-primary"
                title="AI Enhance"
              >
                <Sparkles className="h-3 w-3" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
