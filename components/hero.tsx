"use client"

import { Button } from "./ui/button"
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react"
import { TechBadge } from "./tech-badge"
import { useEffect, useState } from "react"

const techStack = ["Next.js", "React", "TypeScript", "JavaScript", "Node.js", "PostgreSQL", "Supabase", "Tailwind CSS"]

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16 overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-glow"
          style={{
            transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
          }}
        />
        <div
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow"
          style={{
            transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`,
            transition: "transform 0.3s ease-out",
            animationDelay: "2s",
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl animate-glow" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-shrink-0 animate-float">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-accent via-primary to-accent rounded-full blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 animate-gradient" />
              <div className="relative">
                <img
                  src="/Kami.jpeg"
                  alt="Daniel Austen"
                  className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full object-cover border-4 border-background shadow-2xl"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-accent/20 to-transparent" />
              </div>
            </div>
          </div>

          <div className="space-y-8 flex-1">
            <div className="space-y-4">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                  Hi, I'm <span className="gradient-text animate-gradient inline-block">Daniel Austen</span>
                </h1>
              </div>
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <p className="text-xl sm:text-2xl md:text-3xl text-muted-foreground text-balance">
                  Full-Stack Developer
                </p>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
                I'm passionate about building scalable, production-ready web applications that solve real-world
                problems. Currently seeking full-time opportunities to contribute to innovative teams and create
                impactful software solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="bg-accent text-accent-foreground hover:bg-accent/90 glow-accent hover:scale-105 transition-all duration-300"
              >
                View Projects
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="hover:scale-105 transition-all duration-300 glass-effect"
              >
                Contact Me
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
              {techStack.map((tech, index) => (
                <div
                  key={tech}
                  className="animate-in fade-in slide-in-from-bottom-2 duration-500"
                  style={{ animationDelay: `${500 + index * 50}ms` }}
                >
                  <TechBadge>{tech}</TechBadge>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500">
              <a
                href="https://github.com/D-Honoured1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com/in/D-Honoured1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
              <a
                href="mailto:temifeausten@gmail.com"
                className="text-muted-foreground hover:text-accent transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-accent transition-all duration-300 animate-bounce"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6" />
      </button>
    </section>
  )
}
