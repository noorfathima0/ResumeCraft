"use client"

import { Mail, Phone, MapPin, Globe, Linkedin, Crown, Award } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface ExecutiveTemplateProps {
  data: ResumeData
}

export function ExecutiveTemplate({ data }: ExecutiveTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="max-w-4xl mx-auto bg-white text-gray-900 font-serif">
      {/* Executive Header */}
      <div className="border-b-4 border-gray-900 pb-8 mb-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-3 tracking-wide">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && (
            <h2 className="text-2xl text-gray-700 font-light mb-6 tracking-wide">{personalInfo.title}</h2>
          )}
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="h-4 w-4" />
                <span>{personalInfo.linkedin}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <span>{personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      {personalInfo.summary && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-6 w-6 text-gray-900" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">EXECUTIVE SUMMARY</h3>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-900">
            <p className="text-gray-800 leading-relaxed text-lg font-light italic">{personalInfo.summary}</p>
          </div>
        </div>
      )}

      {/* Leadership Experience */}
      {experience.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-gray-900" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">LEADERSHIP EXPERIENCE</h3>
          </div>

          <div className="space-y-8">
            {experience.map((exp) => (
              <div key={exp.id} className="border-l-4 border-gray-300 pl-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h4>
                    <p className="text-lg text-gray-700 font-semibold">{exp.company}</p>
                    {exp.location && <p className="text-gray-600">{exp.location}</p>}
                  </div>
                  <div className="text-right">
                    <div className="bg-gray-900 text-white px-4 py-2 rounded">
                      <span className="font-medium">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                </div>

                {exp.description && exp.description.length > 0 && (
                  <div className="space-y-3">
                    {exp.description.map((desc, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-gray-900 rounded-full mt-3 flex-shrink-0"></div>
                        <p className="text-gray-700 leading-relaxed">{desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Core Competencies */}
      {(skills.technical.length > 0 || skills.soft.length > 0) && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-6 w-6 text-gray-900" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">CORE COMPETENCIES</h3>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {skills.technical.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Technical Leadership</h4>
                  <div className="space-y-2">
                    {skills.technical.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Executive Skills</h4>
                  <div className="space-y-2">
                    {skills.soft.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Strategic Initiatives */}
      {projects.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-gray-900" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">STRATEGIC INITIATIVES</h3>
          </div>

          <div className="space-y-6">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-50 p-6 rounded-lg border-l-4 border-gray-900">
                <h4 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h4>
                {project.description && <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-600 mr-2">Key Technologies:</span>
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="text-sm text-gray-700 font-medium">
                        {tech}
                        {index < project.technologies.length - 1 && " • "}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Crown className="h-6 w-6 text-gray-900" />
            <h3 className="text-2xl font-bold text-gray-900 tracking-wide">EDUCATION</h3>
          </div>

          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start bg-gray-50 p-6 rounded-lg">
                <div>
                  <h4 className="text-lg font-bold text-gray-900">
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h4>
                  <p className="text-gray-700 font-semibold">{edu.institution}</p>
                  {edu.location && <p className="text-gray-600">{edu.location}</p>}
                  {edu.gpa && <p className="text-gray-600">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right">
                  <span className="bg-gray-900 text-white px-3 py-1 rounded text-sm font-medium">
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
