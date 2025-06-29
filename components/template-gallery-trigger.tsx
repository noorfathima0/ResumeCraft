"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TemplateGallery } from "@/components/template-gallery"
import { Palette } from "lucide-react"

export function TemplateGalleryTrigger() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" className="gap-2">
        <Palette className="h-4 w-4" />
        Browse Templates
      </Button>
      <TemplateGallery open={open} onOpenChange={setOpen} />
    </>
  )
}
