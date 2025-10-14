import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Button } from "./ui/button"
import { ExternalLink, Github } from "lucide-react"
import { TechBadge } from "./tech-badge"
import Image from "next/image"
import { DynamicProjectImage } from "./dynamic-project-image"

interface ProjectCardProps {
  title: string
  description: string
  image?: string // Made image optional
  tech: string[]
  github: string
  demo: string | null
  comingSoon?: boolean
}

export function ProjectCard({ title, description, image, tech, github, demo, comingSoon }: ProjectCardProps) {
  const projectImage =
    image || `/placeholder.svg?height=400&width=600&query=${encodeURIComponent(`${title} project preview`)}`

  return (
    <Card className="group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 hover:border-accent/50 hover:-translate-y-2 hover:scale-[1.02] glass-effect h-full">
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden bg-muted">
          {demo ? (
            <DynamicProjectImage demoUrl={demo} fallbackImage={projectImage} title={title} />
          ) : (
            <Image
              src={projectImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {comingSoon && (
            <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium glow-accent animate-pulse">
              Coming Soon
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <h3 className="text-xl font-semibold group-hover:gradient-text transition-all duration-300">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <div key={t} className="transition-transform duration-300 hover:scale-110">
              <TechBadge variant="secondary">{t}</TechBadge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button
          variant="outline"
          size="sm"
          asChild
          className="flex-1 bg-transparent hover:bg-accent/10 hover:border-accent transition-all duration-300"
        >
          <a href={github} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            Code
          </a>
        </Button>
        {demo && (
          <Button
            size="sm"
            asChild
            className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90 glow-accent hover:scale-105 transition-all duration-300"
          >
            <a href={demo} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
