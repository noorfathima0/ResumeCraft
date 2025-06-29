"use client"

import { Mail, Phone, MapPin, Calendar, Palette } from "lucide-react"
import type { ResumeData } from "@/lib/types"

interface CreativeTemplateProps {
  data: ResumeData
}

export function CreativeTemplate({ data }: CreativeTemplateProps) {
  const { personalInfo, experience, education, skills, projects } = data

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-purple-50 to-pink-50 text-gray-900 font-sans">
      {/* Header with Creative Design */}
      <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-t-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          {personalInfo.title && <h2 className="text-xl font-light mb-4 text-purple-100">{personalInfo.title}</h2>}

          <div className="flex flex-wrap gap-4 text-sm text-purple-100">
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
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Creative Summary */}
        {personalInfo.summary && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Creative Vision</h3>
            </div>
            <p className="text-gray-700 leading-relaxed pl-11 italic">{personalInfo.summary}</p>
          </div>
        )}

        {/* Experience with Creative Layout */}
        {experience.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Experience Journey</h3>
            </div>

            <div className="space-y-6 pl-11">
              {experience.map((exp, index) => (
                <div key={exp.id} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-2 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>

                  <div className="bg-white rounded-xl p-6 shadow-md border-l-4 border-purple-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg text-gray-900">{exp.position}</h4>
                        <p className="text-purple-600 font-semibold">{exp.company}</p>
                        {exp.location && <p className="text-sm text-gray-600">{exp.location}</p>}
                      </div>
                      <div className="text-right">
                        <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                          {formatDate(exp.startDate)} - {exp.current ? "Present" : formatDate(exp.endDate)}
                        </span>
                      </div>
                    </div>
                    {Array.isArray(exp.description) && exp.description.length > 0 && (
                      <ul className="space-y-2">
                        {exp.description.map((desc, descIndex) => (
                          <li key={descIndex} className="flex items-start gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills with Creative Design */}
        {(skills.technical.length > 0 || skills.soft.length > 0) && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Creative Skills</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
              {skills.technical.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-4">Technical Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.technical.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {skills.soft.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-md">
                  <h4 className="font-bold text-gray-900 mb-4">Creative Abilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {skills.soft.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Projects Portfolio */}
        {projects.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Creative Portfolio</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-11">
              {projects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
                  <h4 className="font-bold text-lg text-gray-900 mb-2">{project.name}</h4>
                  {project.description && <p className="text-gray-700 mb-4">{project.description}</p>}
                  {Array.isArray(project.technologies) && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                        >
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
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Palette className="h-4 w-4 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Education</h3>
            </div>

            <div className="space-y-4 pl-11">
              {education.map((edu) => (
                <div key={edu.id} className="bg-white rounded-xl p-6 shadow-md">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-gray-900">
                        {edu.degree} {edu.field && `in ${edu.field}`}
                      </h4>
                      <p className="text-purple-600 font-semibold">{edu.institution}</p>
                      {edu.location && <p className="text-sm text-gray-600">{edu.location}</p>}
                    </div>
                    <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
