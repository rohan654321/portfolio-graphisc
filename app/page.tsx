import Navbar from "./navbar/page"
import Hero from "./hero/page"
import About from "./about/page"
import Portfolio from "./portfolio/page"
import Skills from "./skills/page"
import Contact from "./contact/page"
import Footer from "./footer/page"
import { ProjectSyncProvider } from "@/components/project-sync-provider"

export default function Home() {
  return (
    <ProjectSyncProvider>
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <About />
        <Portfolio />
        <Skills />
        <Contact />
        <Footer />
      </main>
    </ProjectSyncProvider>
  )
}
