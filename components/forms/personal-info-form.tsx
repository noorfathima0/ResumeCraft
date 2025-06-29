"use client"

import { useState } from "react"
import { useResumeStore } from "@/lib/resume-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Linkedin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function PersonalInfoForm() {
  const [showLinkedInImport, setShowLinkedInImport] = useState(false)
  const { resumeData, updatePersonalInfo } = useResumeStore()
  const personalInfo = resumeData.personalInfo

  const handleInputChange = (field: string, value: string) => {
    updatePersonalInfo({ [field]: value })
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={personalInfo.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                placeholder="John"
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={personalInfo.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Doe"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="title">Professional Title</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                value={personalInfo.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Software Engineer"
              />

            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={personalInfo.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="john.doe@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={personalInfo.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={personalInfo.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={personalInfo.linkedin}
                onChange={(e) => handleInputChange("linkedin", e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div>
              <Label htmlFor="website">Website/Portfolio</Label>
              <Input
                id="website"
                value={personalInfo.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="johndoe.dev"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <div className="space-y-2">
              <Textarea
                id="summary"
                value={personalInfo.summary}
                onChange={(e) => handleInputChange("summary", e.target.value)}
                placeholder="Write a compelling professional summary..."
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

    </>
  )
}
