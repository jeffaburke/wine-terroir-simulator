import { useState } from 'react'
import { TerroirControls } from './TerroirControls'
import type { TerroirValues } from './TerroirControls'
import { ResultsPanel } from './ResultsPanel'

const defaultValues: TerroirValues = {
  temperature: 18,
  rainfall: 600,
  altitude: 300,
  soilType: 'Limestone',
}

export function SimulatorSection() {
  const [terroir, setTerroir] = useState<TerroirValues>(defaultValues)

  return (
    <section id="simulator" className="py-16 md:py-24 bg-beige-dark scroll-mt-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2>Simulate Your Terroir</h2>
          <p className="mt-4 text-lg max-w-2xl mx-auto">
            Adjust climate and soil parameters to discover matching wine regions and grape varieties.
          </p>
        </div>
        
        {/* Controls at top */}
        <div className="mb-12">
          <TerroirControls values={terroir} onChange={setTerroir} />
        </div>
        
        {/* Results below */}
        <ResultsPanel terroir={terroir} />
      </div>
    </section>
  )
}
