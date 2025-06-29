"use client"

import type { ResumeData } from "@/lib/types"

interface MinimalTemplateProps {
  data: ResumeData
}

export function MinimalTemplate({ data }: MinimalTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-800 font-light">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-light tracking-wide mb-1">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && <h2 className="text-gray-600 mb-4">{personalInfo.title}</h2>}

        <div className="text-sm text-gray-600 space-x-4">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
        </div>
        {(personalInfo.linkedin || personalInfo.website) && (
          <div className="text-sm text-gray-600 space-x-4 mt-1">
            {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo.website && personalInfo.linkedin && <span>•</span>}
            {personalInfo.website && <span>{personalInfo.website}</span>}
          </div>
        )}
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-8">
          <p className="text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900 mb-4">Experience</h3>
          <div className="space-y-6">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className="font-medium text-gray-900">{exp.position}</h4>
                  <span className="text-sm text-gray-600">
                    {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  {exp.company}
                  {exp.location && ` • ${exp.location}`}
                </p>
                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <ul className="space-y-1 text-gray-700">
                    {exp.description.map((desc, index) => (
                      <li key={index} className="text-sm leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900 mb-4">Education</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h4>
                    <p className="text-gray-700">
                      {edu.institution}
                      {edu.location && ` • ${edu.location}`}
                    </p>
                    {edu.gpa && <p className="text-sm text-gray-600">GPA: {edu.gpa}</p>}
                  </div>
                  <span className="text-sm text-gray-600">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <div className="mb-8">
          <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900 mb-4">Skills</h3>
          <div className="space-y-2">
            {skills.technical.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-900 font-medium">Technical: </span>
                <span className="text-gray-700">{skills.technical.join(" • ")}</span>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-900 font-medium">Soft Skills: </span>
                <span className="text-gray-700">{skills.soft.join(" • ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-medium tracking-wider uppercase text-gray-900 mb-4">Projects</h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                {project.description && <p className="text-sm text-gray-700 mb-2">{project.description}</p>}
                {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                  <p className="text-sm text-gray-600">{project.technologies.join(" • ")}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
