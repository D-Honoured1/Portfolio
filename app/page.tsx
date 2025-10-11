import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Projects } from "@/components/projects"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Navigation } from "@/components/navigation"

export default function Home() {
  return (
    <ThemeProvider>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </ThemeProvider>
  )
}
