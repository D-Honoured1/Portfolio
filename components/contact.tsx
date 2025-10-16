"use client"

import { Button } from "./ui/button"
import { Github, Linkedin, Mail, Sparkles } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import profileData from "@/data/profile.json"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-glow" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="space-y-8 text-center">
          <div
            className={`space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {profileData.availability.message}
            </p>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 w-full sm:w-auto glow-accent hover:scale-105 transition-all duration-300"
            >
              <a href={`mailto:${profileData.email}`}>
                <Mail className="h-5 w-5 mr-2" />
                Send Email
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto glass-effect hover:border-accent/50 hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <a href={profileData.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="w-full sm:w-auto glass-effect hover:border-accent/50 hover:scale-105 transition-all duration-300 bg-transparent"
            >
              <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5 mr-2" />
                LinkedIn
              </a>
            </Button>
          </div>

          <div
            className={`pt-8 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-effect border border-accent/30 glow-accent">
              <Sparkles className="h-4 w-4 text-accent animate-pulse" />
              <p className="text-accent font-medium">{profileData.availability.status}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
