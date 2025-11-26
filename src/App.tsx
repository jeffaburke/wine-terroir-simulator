import { HeroSection } from './components/HeroSection'
import { SimulatorSection } from './components/SimulatorSection'
import { UnderstandingTerroirSection } from './components/UnderstandingTerroirSection'
import { SourcesSection } from './components/SourcesSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-beige">
      <HeroSection />
      <SimulatorSection />
      <UnderstandingTerroirSection />
      <SourcesSection />
      <Footer />
    </div>
  )
}

export default App
