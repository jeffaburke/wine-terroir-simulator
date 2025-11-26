import { useState, useCallback, useEffect, useMemo } from 'react'
import { geoNaturalEarth1, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Topology, GeometryCollection } from 'topojson-specification'
import type { FeatureCollection, Feature, Geometry, MultiPolygon, Polygon, Position } from 'geojson'

interface WorldMapProps {
  highlightedCountries?: string[]
  highlightedStates?: string[]
  regionLookup?: Record<string, string[]>
  stateLookup?: Record<string, string[]>
  className?: string
}

interface TooltipState {
  visible: boolean
  x: number
  y: number
  code: string
  name: string
  regions: string[]
}

interface CountryProperties {
  name: string
}

interface StateProperties {
  name: string
}

const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Filter France to only include metropolitan France (exclude overseas territories like French Guiana)
function filterMetropolitanFrance(feature: Feature): Feature {
  const geometry = feature.geometry as MultiPolygon | Polygon
  if (geometry.type === 'MultiPolygon') {
    // Filter polygons to only those in Europe (roughly lon -10 to 15, lat 40 to 55)
    const filteredCoords = geometry.coordinates.filter((polygon: Position[][]) => {
      // Check if the polygon's centroid is in Europe
      const firstRing = polygon[0]
      if (!firstRing || firstRing.length === 0) return false
      const avgLon = firstRing.reduce((sum: number, coord: Position) => sum + coord[0], 0) / firstRing.length
      const avgLat = firstRing.reduce((sum: number, coord: Position) => sum + coord[1], 0) / firstRing.length
      return avgLon > -10 && avgLon < 15 && avgLat > 40 && avgLat < 55
    })
    return {
      ...feature,
      geometry: {
        type: 'MultiPolygon',
        coordinates: filteredCoords,
      },
    }
  }
  return feature
}
const US_STATES_URL = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json'

// State name to abbreviation mapping
const stateAbbreviations: Record<string, string> = {
  'Alabama': 'AL', 'Alaska': 'AK', 'Arizona': 'AZ', 'Arkansas': 'AR', 'California': 'CA',
  'Colorado': 'CO', 'Connecticut': 'CT', 'Delaware': 'DE', 'Florida': 'FL', 'Georgia': 'GA',
  'Hawaii': 'HI', 'Idaho': 'ID', 'Illinois': 'IL', 'Indiana': 'IN', 'Iowa': 'IA',
  'Kansas': 'KS', 'Kentucky': 'KY', 'Louisiana': 'LA', 'Maine': 'ME', 'Maryland': 'MD',
  'Massachusetts': 'MA', 'Michigan': 'MI', 'Minnesota': 'MN', 'Mississippi': 'MS', 'Missouri': 'MO',
  'Montana': 'MT', 'Nebraska': 'NE', 'Nevada': 'NV', 'New Hampshire': 'NH', 'New Jersey': 'NJ',
  'New Mexico': 'NM', 'New York': 'NY', 'North Carolina': 'NC', 'North Dakota': 'ND', 'Ohio': 'OH',
  'Oklahoma': 'OK', 'Oregon': 'OR', 'Pennsylvania': 'PA', 'Rhode Island': 'RI', 'South Carolina': 'SC',
  'South Dakota': 'SD', 'Tennessee': 'TN', 'Texas': 'TX', 'Utah': 'UT', 'Vermont': 'VT',
  'Virginia': 'VA', 'Washington': 'WA', 'West Virginia': 'WV', 'Wisconsin': 'WI', 'Wyoming': 'WY',
}

// Country code mapping (numeric to ISO alpha-2)
const numericToAlpha2: Record<string, string> = {
  '840': 'US', '124': 'CA', '484': 'MX',
  '076': 'BR', '032': 'AR', '152': 'CL',
  '620': 'PT', '724': 'ES', '250': 'FR', '380': 'IT', '276': 'DE', '040': 'AT', '348': 'HU', '300': 'GR',
  '710': 'ZA', '504': 'MA',
  '792': 'TR', '268': 'GE', '376': 'IL', '422': 'LB',
  '156': 'CN', '392': 'JP', '356': 'IN',
  '036': 'AU', '554': 'NZ',
  '826': 'GB', '756': 'CH', '056': 'BE', '528': 'NL', '616': 'PL', '642': 'RO',
  '170': 'CO', '604': 'PE', '858': 'UY',
}

export function WorldMap({ 
  highlightedCountries = [], 
  highlightedStates = [],
  regionLookup = {},
  stateLookup = {},
  className = '' 
}: WorldMapProps) {
  const [worldData, setWorldData] = useState<FeatureCollection | null>(null)
  const [usStatesData, setUsStatesData] = useState<FeatureCollection | null>(null)
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    code: '',
    name: '',
    regions: [],
  })
  const [activeCode, setActiveCode] = useState<string | null>(null)

  // Fetch world map data
  useEffect(() => {
    fetch(WORLD_ATLAS_URL)
      .then(res => res.json())
      .then((topology: Topology<{ countries: GeometryCollection<CountryProperties> }>) => {
        const countries = feature(topology, topology.objects.countries) as FeatureCollection
        setWorldData(countries)
      })
      .catch(console.error)
  }, [])

  // Fetch US states data
  useEffect(() => {
    fetch(US_STATES_URL)
      .then(res => res.json())
      .then((topology: Topology<{ states: GeometryCollection<StateProperties> }>) => {
        const states = feature(topology, topology.objects.states) as FeatureCollection
        setUsStatesData(states)
      })
      .catch(console.error)
  }, [])

  // Map projection - single projection for everything
  const projection = useMemo(() => {
    return geoNaturalEarth1()
      .scale(150)
      .translate([400, 200])
  }, [])

  const pathGenerator = useMemo(() => geoPath().projection(projection), [projection])

  const getCountryCode = useCallback((feature: Feature): string => {
    const id = String(feature.id || '')
    return numericToAlpha2[id] || ''
  }, [])

  const getCountryName = useCallback((feature: Feature): string => {
    const props = feature.properties as CountryProperties | null
    return props?.name || 'Unknown'
  }, [])

  const getStateName = useCallback((feature: Feature): string => {
    const props = feature.properties as StateProperties | null
    return props?.name || 'Unknown'
  }, [])

  const getStateAbbr = useCallback((feature: Feature): string => {
    const name = getStateName(feature)
    return stateAbbreviations[name] || ''
  }, [getStateName])

  const isCountryHighlighted = useCallback((code: string) => {
    return highlightedCountries.includes(code)
  }, [highlightedCountries])

  const isStateHighlighted = useCallback((abbr: string) => highlightedStates.includes(abbr), [highlightedStates])

  const showTooltip = (e: React.MouseEvent, code: string, name: string, regions: string[]) => {
    const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect()
    if (!rect) return
    
    setTooltip({
      visible: true,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      code,
      name,
      regions,
    })
    setActiveCode(code)
  }

  const handleCountryMouseEnter = (e: React.MouseEvent, feature: Feature) => {
    const code = getCountryCode(feature)
    if (!isCountryHighlighted(code)) return
    const regions = regionLookup[code] || []
    showTooltip(e, code, getCountryName(feature), regions)
  }

  const handleStateMouseEnter = (e: React.MouseEvent, feature: Feature) => {
    const abbr = getStateAbbr(feature)
    if (!isStateHighlighted(abbr)) return
    const regions = stateLookup[abbr] || []
    showTooltip(e, abbr, getStateName(feature), regions)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!tooltip.visible) return
    const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect()
    if (!rect) return
    
    setTooltip(prev => ({
      ...prev,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }))
  }

  const handleMouseLeave = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
    setActiveCode(null)
  }

  const handleCountryClick = (e: React.MouseEvent, feature: Feature) => {
    const code = getCountryCode(feature)
    if (!isCountryHighlighted(code)) return
    e.stopPropagation()
    
    if (activeCode === code) {
      setTooltip(prev => ({ ...prev, visible: false }))
      setActiveCode(null)
    } else {
      const regions = regionLookup[code] || []
      const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect()
      if (!rect) return
      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        code,
        name: getCountryName(feature),
        regions,
      })
      setActiveCode(code)
    }
  }

  const handleStateClick = (e: React.MouseEvent, feature: Feature) => {
    const abbr = getStateAbbr(feature)
    if (!isStateHighlighted(abbr)) return
    e.stopPropagation()
    
    if (activeCode === abbr) {
      setTooltip(prev => ({ ...prev, visible: false }))
      setActiveCode(null)
    } else {
      const regions = stateLookup[abbr] || []
      const rect = (e.currentTarget as SVGElement).closest('svg')?.getBoundingClientRect()
      if (!rect) return
      setTooltip({
        visible: true,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        code: abbr,
        name: getStateName(feature),
        regions,
      })
      setActiveCode(abbr)
    }
  }

  const handleSvgClick = () => {
    setTooltip(prev => ({ ...prev, visible: false }))
    setActiveCode(null)
  }

  const baseColor = '#d4cfc9'
  const highlightColor = '#8b2e46'
  const activeColor = '#a13d5a'

  // Check if we should show US states instead of US country
  const showUsStates = usStatesData && highlightedStates.length > 0

  if (!worldData) {
    return (
      <div className={`flex items-center justify-center h-48 ${className}`}>
        <p className="text-burgundy/50 text-sm">Loading map...</p>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 800 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleSvgClick}
        style={{ backgroundColor: '#f5f1ed' }}
      >
        {/* World countries */}
        {worldData.features.map((rawFeature, idx) => {
          const code = getCountryCode(rawFeature)
          
          // Skip US if we're showing state-level detail
          if (code === 'US' && showUsStates) {
            return null
          }
          
          // Filter France to only show metropolitan France
          const feature = code === 'FR' ? filterMetropolitanFrance(rawFeature) : rawFeature
          
          const highlighted = isCountryHighlighted(code)
          const active = activeCode === code
          
          let fill = baseColor
          if (highlighted) {
            fill = active ? activeColor : highlightColor
          }

          const path = pathGenerator(feature as Feature<Geometry>)
          if (!path) return null

          return (
            <path
              key={`country-${feature.id || idx}`}
              d={path}
              fill={fill}
              stroke="#f5f1ed"
              strokeWidth="0.5"
              style={{
                transition: 'fill 0.3s ease',
                cursor: highlighted ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => handleCountryMouseEnter(e, feature)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleCountryClick(e, feature)}
            />
          )
        })}

        {/* US States - rendered using the same world projection */}
        {showUsStates && usStatesData.features.map((feature, idx) => {
          const abbr = getStateAbbr(feature)
          const highlighted = isStateHighlighted(abbr)
          const active = activeCode === abbr
          
          let fill = baseColor
          if (highlighted) {
            fill = active ? activeColor : highlightColor
          }

          const path = pathGenerator(feature as Feature<Geometry>)
          if (!path) return null

          return (
            <path
              key={`state-${feature.id || idx}`}
              d={path}
              fill={fill}
              stroke="#f5f1ed"
              strokeWidth="0.3"
              style={{
                transition: 'fill 0.3s ease',
                cursor: highlighted ? 'pointer' : 'default',
              }}
              onMouseEnter={(e) => handleStateMouseEnter(e, feature)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={(e) => handleStateClick(e, feature)}
            />
          )
        })}
      </svg>

      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="absolute pointer-events-none z-20 px-3 py-2 bg-burgundy text-beige text-xs rounded shadow-lg transform -translate-x-1/2 -translate-y-full max-w-xs"
          style={{
            left: Math.min(Math.max(tooltip.x, 80), 720),
            top: tooltip.y - 10,
          }}
        >
          <span className="font-medium block">{tooltip.name}</span>
          {tooltip.regions.length > 0 && (
            <div className="text-beige/80 mt-1">
              {tooltip.regions.map((region, i) => (
                <div key={`${region}-${i}`}>• {region}</div>
              ))}
            </div>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-burgundy" />
        </div>
      )}
    </div>
  )
}
