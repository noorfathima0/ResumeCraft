"use client"

import { Mail, Phone, MapPin, Globe, Github, Code, Terminal, Zap } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface TechTemplateProps {
  data: ResumeData
}

export function TechTemplate({ data }: TechTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 text-green-400 font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-800 p-4 rounded-t-lg border-b border-green-500">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-gray-400 text-sm">~/resume.dev</span>
        </div>
      </div>

      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className="h-5 w-5 text-green-400" />
            <span className="text-gray-400">$</span>
            <span className="text-white">whoami</span>
          </div>

          <h1 className="text-4xl font-bold text-white mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && <h2 className="text-xl text-green-400 mb-4">// {personalInfo.title}</h2>}

          <div className="bg-gray-800 p-4 rounded border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-300">{personalInfo.website}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">$</span>
              <span className="text-white">cat about.txt</span>
            </div>
            <div className="bg-gray-800 p-4 rounded border border-gray-700">
              <p className="text-gray-300 leading-relaxed">{personalInfo.summary}</p>
            </div>
          </div>
        )}

        {/* Skills */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">$</span>
              <span className="text-white">ls -la skills/</span>
            </div>

            <div className="space-y-4">
              {skills.technical.length > 0 && (
                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Code className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-semibold">Technical Stack</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {skills.technical.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-green-400">▶</span>
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.length > 0 && (
                <div className="bg-gray-800 p-4 rounded border border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400 font-semibold">Soft Skills</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {skills.soft.map((skill, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-purple-400">◆</span>
                        <span className="text-gray-300 text-sm">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">$</span>
              <span className="text-white">git log --oneline experience</span>
            </div>

            <div className="space-y-6">
              {experience.map((exp, index) => (
                <div key={exp.id} className="bg-gray-800 p-6 rounded border border-gray-700">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400 font-mono">#{index + 1}</span>
                        <h4 className="text-white font-semibold text-lg">{exp.position}</h4>
                      </div>
                      <p className="text-blue-400 font-semibold">{exp.company}</p>
                      {exp.location && <p className="text-gray-400 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right">
                      <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded text-sm font-mono">
                        {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>

                  {Array.isArray(exp.description) && exp.description.length > 0 && (
                    <div className="space-y-2">
                      {exp.description.map((desc, descIndex) => (
                        <div key={descIndex} className="flex items-start gap-3">
                          <span className="text-green-400 mt-1">→</span>
                          <span className="text-gray-300 text-sm leading-relaxed">{desc}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">$</span>
              <span className="text-white">ls -la projects/</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                  <div className="flex items-center gap-2 mb-2">
                    <Github className="h-4 w-4 text-orange-400" />
                    <h4 className="text-white font-semibold">{project.name}</h4>
                  </div>

                  {project.description && (
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">{project.description}</p>
                  )}

                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, index) => (
                        <span key={index} className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs font-mono">
                          {tech}
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
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="h-5 w-5 text-green-400" />
              <span className="text-gray-400">$</span>
              <span className="text-white">cat education.log</span>
            </div>

            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-white font-semibold">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h4>
                      <p className="text-blue-400">{edu.institution}</p>
                      {edu.location && <p className="text-gray-400 text-sm">{edu.location}</p>}
                      {edu.gpa && <p className="text-gray-400 text-sm">GPA: {edu.gpa}</p>}
                    </div>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-sm font-mono">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Terminal Footer */}
        <div className="mt-8 pt-4 border-t border-gray-700">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <Terminal className="h-4 w-4" />
            <span>Ready for new challenges</span>
            <span className="animate-pulse">_</span>
          </div>
        </div>
      </div>
    </div>
  )
}
