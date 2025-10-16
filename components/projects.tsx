"use client"

import type React from "react"

import { ProjectCard } from "./project-card"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import projectsData from "@/data/projects.json"

const projects = projectsData

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [currentIndex, setCurrentIndex] = useState(projects.length) // Start at middle set
  const [itemsPerView, setItemsPerView] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(true)

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

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    updateItemsPerView()
    window.addEventListener("resize", updateItemsPerView)
    return () => window.removeEventListener("resize", updateItemsPerView)
  }, [])

  // Create infinite loop by duplicating projects
  const infiniteProjects = [...projects, ...projects, ...projects]
  const maxIndex = Math.max(0, projects.length - itemsPerView)

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1
      // Reset to beginning when reaching the end of second set
      if (nextIndex >= projects.length * 2) {
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(projects.length)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
      }
      return nextIndex
    })
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 1
      // Jump to end of second set when going before first set
      if (prevIndex < projects.length) {
        setTimeout(() => {
          setIsTransitioning(false)
          setCurrentIndex(projects.length * 2 - 1)
          setTimeout(() => setIsTransitioning(true), 50)
        }, 500)
      }
      return prevIndex
    })
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      goToNext()
    }
    if (touchStart - touchEnd < -75) {
      goToPrev()
    }
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-glow" />
      <div
        className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-glow"
        style={{ animationDelay: "2s" }}
      />

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="space-y-12">
          <div
            className={`space-y-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              A selection of projects showcasing my skills in full-stack development
            </p>
          </div>

          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/50 hover:bg-accent/20 hover:border-accent transition-all duration-300 hover:scale-110 glow-accent hidden md:flex"
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 h-12 w-12 rounded-full bg-background/80 backdrop-blur-sm border-accent/50 hover:bg-accent/20 hover:border-accent transition-all duration-300 hover:scale-110 glow-accent hidden md:flex"
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Carousel Container */}
            <div
              ref={carouselRef}
              className="overflow-hidden px-4 md:px-0"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div
                className={`flex gap-4 md:gap-8 ${isTransitioning ? 'transition-transform duration-500 ease-out' : ''}`}
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                }}
              >
                {infiniteProjects.map((project, index) => (
                  <div
                    key={`${project.title}-${index}`}
                    className={`flex-shrink-0 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{
                      width: `calc(${100 / itemsPerView}% - ${((itemsPerView - 1) * 32) / itemsPerView}px)`,
                      transitionDelay: `${200 + (index % projects.length) * 150}ms`,
                    }}
                  >
                    <ProjectCard {...project} />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => {
                const normalizedIndex = currentIndex % projects.length
                return (
                  <button
                    key={index}
                    onClick={() => goToSlide(projects.length + index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === normalizedIndex
                        ? "w-8 bg-accent glow-accent"
                        : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
