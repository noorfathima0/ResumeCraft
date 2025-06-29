export interface PersonalInfo {
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  website: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string
  gpa: string
}

export interface Skills {
  technical: string[]
  soft: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  link: string
  github: string
}

export interface ResumeData {
  personalInfo: PersonalInfo
  experience: Experience[]
  education: Education[]
  skills: Skills
  projects: Project[]
}
