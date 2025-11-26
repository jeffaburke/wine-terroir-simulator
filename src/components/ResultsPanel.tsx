import { useEffect, useState, useMemo } from 'react'
import type { TerroirValues } from './TerroirControls'
import { useTerroirSimulation } from '../hooks/useTerroirSimulation'
import type { ScoredRegion, ScoredGrape } from '../hooks/useTerroirSimulation'
import type { FlavorProfile } from '../data/terroirData'
import { WorldMap } from './Map/WorldMap'

const countryToISO: Record<string, string> = {
  'United States': 'US',
  'France': 'FR',
  'Italy': 'IT',
  'Spain': 'ES',
  'Portugal': 'PT',
  'Argentina': 'AR',
  'South Africa': 'ZA',
  'Australia': 'AU',
  'New Zealand': 'NZ',
  'Germany': 'DE',
  'Austria': 'AT',
  'Chile': 'CL',
  'Greece': 'GR',
  'Hungary': 'HU',
}

// US state abbreviations for state-level highlighting
const stateNameToAbbr: Record<string, string> = {
  'California': 'CA', 'Oregon': 'OR', 'Washington': 'WA', 'New York': 'NY',
  'Texas': 'TX', 'Virginia': 'VA', 'Colorado': 'CO', 'Arizona': 'AZ',
  'Michigan': 'MI', 'Ohio': 'OH', 'Pennsylvania': 'PA', 'Missouri': 'MO',
  'Idaho': 'ID', 'New Mexico': 'NM', 'North Carolina': 'NC',
}

interface ResultsPanelProps {
  terroir: TerroirValues
}

export function ResultsPanel({ terroir }: ResultsPanelProps) {
  const { matchedRegions, matchedGrapes, derivedFlavorProfile } = useTerroirSimulation(terroir)
  const [isVisible, setIsVisible] = useState(false)

  const highlightedCountries = useMemo(() => {
    const codes = matchedRegions
      .map(r => countryToISO[r.country])
      .filter((code): code is string => !!code)
    return [...new Set(codes)]
  }, [matchedRegions])

  const regionLookup = useMemo(() => {
    const lookup: Record<string, string[]> = {}
    for (const region of matchedRegions) {
      const code = countryToISO[region.country]
      if (code && code !== 'US') {
        if (!lookup[code]) lookup[code] = []
        lookup[code].push(region.name)
      }
    }
    return lookup
  }, [matchedRegions])

  const highlightedStates = useMemo(() => {
    const states = matchedRegions
      .filter(r => r.country === 'United States' && r.stateOrProvince)
      .map(r => stateNameToAbbr[r.stateOrProvince!])
      .filter((s): s is string => !!s)
    return [...new Set(states)]
  }, [matchedRegions])

  const stateLookup = useMemo(() => {
    const lookup: Record<string, string[]> = {}
    for (const region of matchedRegions) {
      if (region.country === 'United States' && region.stateOrProvince) {
        const abbr = stateNameToAbbr[region.stateOrProvince]
        if (abbr) {
          if (!lookup[abbr]) lookup[abbr] = []
          lookup[abbr].push(region.name)
        }
      }
    }
    return lookup
  }, [matchedRegions])

  useEffect(() => {
    setIsVisible(false)
    const timer = setTimeout(() => setIsVisible(true), 50)
    return () => clearTimeout(timer)
  }, [terroir.temperature, terroir.rainfall, terroir.altitude, terroir.soilType])

  return (
    <div className={`space-y-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      {/* Regions Section */}
      <section className="card">
        <h3 className="mb-6">Regions That Fit This Terroir</h3>
        <div className="space-y-4">
          {matchedRegions.map((region, idx) => (
            <RegionCard key={region.id} region={region} rank={idx + 1} />
          ))}
        </div>
      </section>

      {/* World Map Section */}
      <section className="card">
        <h3 className="mb-6">Matching Wine Regions</h3>
        <div className="bg-beige/30 rounded-sm p-4 md:p-6">
          <WorldMap 
            highlightedCountries={highlightedCountries} 
            highlightedStates={highlightedStates}
            regionLookup={regionLookup} 
            stateLookup={stateLookup}
          />
        </div>
      </section>

      {/* Grapes Section */}
      <section className="card">
        <h3 className="mb-6">Grapes That Could Thrive Here</h3>
        <div className="flex flex-wrap gap-3">
          {matchedGrapes.map(grape => (
            <GrapeTag key={grape.id} grape={grape} />
          ))}
        </div>
      </section>

      {/* Flavor Profile Section */}
      <section className="card">
        <h3 className="mb-6">Expected Flavor Profile</h3>
        <FlavorProfileChart profile={derivedFlavorProfile} />
      </section>
    </div>
  )
}

function RegionCard({ region, rank }: { region: ScoredRegion; rank: number }) {
  return (
    <div className="p-5 bg-beige/50 border border-gray/30 rounded-sm hover:border-burgundy/30 transition-colors">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-medium text-burgundy/40 uppercase tracking-wider">#{rank}</span>
            <h4 className="text-lg">{region.name}</h4>
          </div>
          <p className="text-sm text-burgundy/60 mt-0.5">
            {region.country} · {region.appellation}
          </p>
        </div>
        <span className="text-sm font-medium text-burgundy/70 bg-burgundy/10 px-2 py-1 rounded">
          {region.score.toFixed(0)}%
        </span>
      </div>
      
      <p className="text-sm text-burgundy/70 leading-relaxed mb-4">
        {region.description}
      </p>
      
      <div className="flex flex-wrap gap-2">
        {region.keyGrapes.slice(0, 5).map(grape => (
          <span
            key={grape}
            className="text-xs px-2 py-1 bg-burgundy/5 text-burgundy/70 border border-burgundy/10 rounded-full"
          >
            {grape.replace(/_/g, ' ')}
          </span>
        ))}
        {region.keyGrapes.length > 5 && (
          <span className="text-xs px-2 py-1 text-burgundy/50">
            +{region.keyGrapes.length - 5} more
          </span>
        )}
      </div>
    </div>
  )
}

function GrapeTag({ grape }: { grape: ScoredGrape }) {
  const colorStyles = {
    red: 'bg-burgundy/10 border-burgundy/20 text-burgundy',
    white: 'bg-amber-50 border-amber-200/50 text-amber-800',
    rosé: 'bg-pink-50 border-pink-200/50 text-pink-800',
  }

  return (
    <div className={`group relative px-4 py-2.5 border rounded-sm cursor-default transition-all hover:shadow-md ${colorStyles[grape.color]}`}>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full" style={{
          backgroundColor: grape.color === 'red' ? '#4a1c2f' : grape.color === 'white' ? '#d4a574' : '#c77d8e'
        }} />
        <span className="font-medium text-sm">{grape.name}</span>
        <span className="text-xs opacity-60">{grape.score.toFixed(0)}%</span>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-burgundy text-beige text-xs rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
        <p className="leading-relaxed">{grape.notes}</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-burgundy" />
      </div>
    </div>
  )
}

function FlavorProfileChart({ profile }: { profile: FlavorProfile }) {
  const attributes = [
    { key: 'acidity', label: 'Acidity', value: profile.acidity },
    { key: 'tannin', label: 'Tannin', value: profile.tannin },
    { key: 'body', label: 'Body', value: profile.body },
    { key: 'fruitiness', label: 'Fruitiness', value: profile.fruitiness },
    { key: 'earthiness', label: 'Earthiness', value: profile.earthiness },
  ]

  return (
    <div className="space-y-4">
      {attributes.map(attr => (
        <div key={attr.key} className="flex items-center gap-4">
          <span className="w-24 text-sm text-burgundy/70 text-right">{attr.label}</span>
          <div className="flex-1 h-3 bg-gray/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-burgundy to-burgundy-light rounded-full transition-all duration-700 ease-out"
              style={{ width: `${(attr.value / 5) * 100}%` }}
            />
          </div>
          <span className="w-8 text-sm font-medium text-burgundy/80">{attr.value.toFixed(1)}</span>
        </div>
      ))}
    </div>
  )
}
