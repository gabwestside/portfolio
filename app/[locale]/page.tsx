import { AboutSection } from '@/components/about-section'
import { ContactSection } from '@/components/contact-section'
import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { ProjectsSection } from '@/components/sections-project'

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
