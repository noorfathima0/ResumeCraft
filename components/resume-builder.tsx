"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { ExperienceForm } from "@/components/forms/experience-form"
import { EducationForm } from "@/components/forms/education-form"
import { SkillsForm } from "@/components/forms/skills-form"
import { ProjectsForm } from "@/components/forms/projects-form"
import { User, Briefcase, GraduationCap, Code, FolderOpen } from "lucide-react"

const sections = [
  {
    id: "personal",
    title: "Personal Information",
    icon: User,
    component: PersonalInfoForm,
    defaultOpen: true,
  },
  {
    id: "experience",
    title: "Work Experience",
    icon: Briefcase,
    component: ExperienceForm,
  },
  {
    id: "education",
    title: "Education",
    icon: GraduationCap,
    component: EducationForm,
  },
  {
    id: "skills",
    title: "Skills",
    icon: Code,
    component: SkillsForm,
  },
  {
    id: "projects",
    title: "Projects",
    icon: FolderOpen,
    component: ProjectsForm,
  },
]

export function ResumeBuilder() {
  return (
    <div className="p-6 space-y-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Accordion type="multiple" defaultValue={["personal"]} className="space-y-4">
          {sections.map((section, index) => {
            const Icon = section.icon
            const Component = section.component

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <AccordionItem
                  value={section.id}
                  className="border rounded-lg bg-card shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="font-medium">{section.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Component />
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            )
          })}
        </Accordion>
      </motion.div>
    </div>
  )
}
