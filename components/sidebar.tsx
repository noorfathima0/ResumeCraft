"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { User, FileText, GraduationCap, Briefcase, Code, FolderOpen, Award, Plus } from "lucide-react"

interface SidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections = [
  { id: "personal", title: "Personal", icon: User },
  { id: "summary", title: "Summary", icon: FileText },
  { id: "education", title: "Education", icon: GraduationCap },
  { id: "experience", title: "Experience", icon: Briefcase },
  { id: "skills", title: "Skills", icon: Code },
  { id: "projects", title: "Projects", icon: FolderOpen },
  { id: "awards", title: "Awards", icon: Award },
]

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl h-full p-6">
      <div className="space-y-2">
        {sections.map((section, index) => {
          const Icon = section.icon
          const isActive = activeSection === section.id

          return (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full justify-start h-12 ${
                  isActive ? "bg-primary text-primary-foreground shadow-lg" : "hover:bg-gray-100"
                }`}
                onClick={() => onSectionChange(section.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${isActive ? "bg-white/20" : "bg-gray-100"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{section.title}</span>
                </div>
              </Button>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-lg">
          <Plus className="h-4 w-4 mr-2" />
          New Section
        </Button>
      </motion.div>
    </Card>
  )
}
