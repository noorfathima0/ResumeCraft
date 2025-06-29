"use client"

import type { ResumeData } from "@/lib/types"

interface ClassicTemplateProps {
  data: ResumeData
}

export function ClassicTemplate({ data }: ClassicTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-black font-serif leading-relaxed">
      {/* Header */}
      <div className="text-center border-b-2 border-black pb-4 mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {personalInfo.firstName} {personalInfo.lastName}
        </h1>
        {personalInfo.title && <h2 className="text-lg mb-3">{personalInfo.title}</h2>}

        <div className="text-sm space-y-1">
          {personalInfo.email && <div>{personalInfo.email}</div>}
          {personalInfo.phone && <div>{personalInfo.phone}</div>}
          {personalInfo.location && <div>{personalInfo.location}</div>}
          {personalInfo.linkedin && <div>{personalInfo.linkedin}</div>}
          {personalInfo.website && <div>{personalInfo.website}</div>}
        </div>
      </div>

      {/* Professional Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-2 text-center">OBJECTIVE</h3>
          <p className="text-justify">{personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-center border-b border-black pb-1">EXPERIENCE</h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-bold">{exp.position}</h4>
                    <p className="italic">
                      {exp.company}
                      {exp.location && `, ${exp.location}`}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <span>
                      {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                    </span>
                  </div>
                </div>
                {Array.isArray(exp.description) && exp.description.length > 0 && (
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    {exp.description.map((desc, index) => (
                      <li key={index}>{desc}</li>
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
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-center border-b border-black pb-1">EDUCATION</h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="italic">
                    {edu.institution}
                    {edu.location && `, ${edu.location}`}
                  </p>
                  {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-sm">
                  <span>
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
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-center border-b border-black pb-1">SKILLS</h3>
          <div className="space-y-2">
            {skills.technical.length > 0 && (
              <div>
                <span className="font-bold">Technical: </span>
                <span>{skills.technical.join(", ")}</span>
              </div>
            )}
            {skills.soft.length > 0 && (
              <div>
                <span className="font-bold">Soft Skills: </span>
                <span>{skills.soft.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-center border-b border-black pb-1">PROJECTS</h3>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id}>
                <h4 className="font-bold">{project.name}</h4>
                {project.description && <p className="mb-1">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <p className="text-sm">
                    <span className="font-bold">Technologies: </span>
                    {project.technologies.join(", ")}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
