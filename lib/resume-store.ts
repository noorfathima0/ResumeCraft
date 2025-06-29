"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { ResumeData, Experience, Education, Project } from "./types"

interface ResumeStore {
  resumeData: ResumeData
  selectedTemplate: string
  updatePersonalInfo: (info: Partial<ResumeData["personalInfo"]>) => void
  addExperience: (experience: Experience) => void
  updateExperience: (id: string, updates: Partial<Experience>) => void
  removeExperience: (id: string) => void
  addEducation: (education: Education) => void
  updateEducation: (id: string, updates: Partial<Education>) => void
  removeEducation: (id: string) => void
  updateSkills: (skills: ResumeData["skills"]) => void
  addProject: (project: Project) => void
  updateProject: (id: string, updates: Partial<Project>) => void
  removeProject: (id: string) => void
  setSelectedTemplate: (template: string) => void
  saveResume: () => void
  loadResume: (data: ResumeData) => void
}

const initialResumeData: ResumeData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
  },
  projects: [],
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      resumeData: initialResumeData,
      selectedTemplate: "modern",

      updatePersonalInfo: (info) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            personalInfo: { ...state.resumeData.personalInfo, ...info },
          },
        })),

      addExperience: (experience) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: [...state.resumeData.experience, experience],
          },
        })),

      updateExperience: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp)),
          },
        })),

      removeExperience: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            experience: state.resumeData.experience.filter((exp) => exp.id !== id),
          },
        })),

      addEducation: (education) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: [...state.resumeData.education, education],
          },
        })),

      updateEducation: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu)),
          },
        })),

      removeEducation: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            education: state.resumeData.education.filter((edu) => edu.id !== id),
          },
        })),

      updateSkills: (skills) =>
        set((state) => ({
          resumeData: { ...state.resumeData, skills },
        })),

      addProject: (project) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: [...state.resumeData.projects, project],
          },
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj)),
          },
        })),

      removeProject: (id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            projects: state.resumeData.projects.filter((proj) => proj.id !== id),
          },
        })),

      setSelectedTemplate: (template) => {
        const validTemplates = ["modern", "classic", "minimal", "creative", "executive", "tech"]
        if (validTemplates.includes(template)) {
          set({ selectedTemplate: template })
        }
      },

      saveResume: () => {
        // Auto-save is handled by persist middleware
        console.log("Resume saved!")
      },
      

      loadResume: (data) => set({ resumeData: data }),
    }),
    {
      name: "resume-storage",
    },
  ),
)
