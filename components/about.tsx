"use client"

import { TechBadge } from "./tech-badge"
import { useEffect, useRef, useState } from "react"

const skills = {
  Frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI"],
  Backend: ["Node.js", "Express", "Supabase", "PostgreSQL", "Prisma"],
  "Tools & Others": ["Git", "Vercel", "Stripe", "Paystack", "Authentication", "REST APIs"],
}

export function About() {
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
    <section ref={sectionRef} id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="space-y-12">
          <div
            className={`space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed glass-effect p-6 rounded-lg">
              I'm a final-year software engineering student with a passion for building scalable web applications. My
              experience spans full-stack development, from crafting intuitive user interfaces to designing robust
              backend systems. I thrive on solving complex problems and continuously learning new technologies to
              deliver high-quality software solutions.
            </p>
          </div>

          <div
            className={`space-y-8 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-semibold">
              Skills & <span className="gradient-text">Technologies</span>
            </h3>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, techs], categoryIndex) => (
                <div
                  key={category}
                  className={`space-y-3 transition-all duration-700 ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${300 + categoryIndex * 100}ms` }}
                >
                  <h4 className="text-lg font-medium text-accent">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {techs.map((tech, techIndex) => (
                      <div
                        key={tech}
                        className={`transition-all duration-500 hover:scale-110 ${
                          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
                        }`}
                        style={{ transitionDelay: `${400 + categoryIndex * 100 + techIndex * 50}ms` }}
                      >
                        <TechBadge>{tech}</TechBadge>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
