import { useState } from 'react'

export type SoilType = 'Limestone' | 'Clay' | 'Granite' | 'Volcanic' | 'Sandy'

export interface TerroirValues {
  temperature: number
  rainfall: number
  altitude: number
  soilType: SoilType
}

interface TerroirControlsProps {
  values: TerroirValues
  onChange: (values: TerroirValues) => void
}

const soilTypes: SoilType[] = ['Limestone', 'Clay', 'Granite', 'Volcanic', 'Sandy']

export function TerroirControls({ values, onChange }: TerroirControlsProps) {
  const [isMetric, setIsMetric] = useState(true)

  const handleChange = <K extends keyof TerroirValues>(key: K, value: TerroirValues[K]) => {
    onChange({ ...values, [key]: value })
  }

  // Conversion helpers
  const toFahrenheit = (c: number) => Math.round((c * 9) / 5 + 32)
  const toInches = (mm: number) => Math.round(mm / 25.4)
  const toFeet = (m: number) => Math.round(m * 3.281)

  const displayTemp = isMetric ? values.temperature : toFahrenheit(values.temperature)
  const displayRainfall = isMetric ? values.rainfall : toInches(values.rainfall)
  const displayAltitude = isMetric ? values.altitude : toFeet(values.altitude)

  const tempUnit = isMetric ? '°C' : '°F'
  const rainfallUnit = isMetric ? 'mm' : 'in'
  const altitudeUnit = isMetric ? 'm' : 'ft'

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl">Terroir Controls</h3>
        <button
          onClick={() => setIsMetric(!isMetric)}
          className="text-sm font-medium px-3 py-1.5 border border-burgundy/30 rounded-full hover:bg-burgundy hover:text-beige transition-colors"
        >
          {isMetric ? 'Metric' : 'Imperial'}
        </button>
      </div>

      {/* Grid layout for controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Temperature */}
        <SliderControl
          label="Temperature"
          helper="Growing season avg"
          value={values.temperature}
          displayValue={displayTemp}
          unit={tempUnit}
          min={0}
          max={35}
          onChange={(v) => handleChange('temperature', v)}
        />

        {/* Rainfall */}
        <SliderControl
          label="Rainfall"
          helper="Annual precipitation"
          value={values.rainfall}
          displayValue={displayRainfall}
          unit={rainfallUnit}
          min={0}
          max={2000}
          step={10}
          onChange={(v) => handleChange('rainfall', v)}
        />

        {/* Altitude */}
        <SliderControl
          label="Altitude"
          helper="Elevation"
          value={values.altitude}
          displayValue={displayAltitude}
          unit={altitudeUnit}
          min={0}
          max={2000}
          step={10}
          onChange={(v) => handleChange('altitude', v)}
        />
      </div>

      {/* Soil Type */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <label className="text-sm font-medium text-burgundy">Soil Type</label>
          <span className="text-xs text-burgundy/50">Primary composition</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {soilTypes.map((soil) => (
            <button
              key={soil}
              onClick={() => handleChange('soilType', soil)}
              className={`px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 ${
                values.soilType === soil
                  ? 'bg-burgundy text-beige border-burgundy'
                  : 'bg-transparent text-burgundy border-burgundy/30 hover:border-burgundy'
              }`}
            >
              {soil}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

interface SliderControlProps {
  label: string
  helper: string
  value: number
  displayValue: number
  unit: string
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

function SliderControl({
  label,
  helper,
  value,
  displayValue,
  unit,
  min,
  max,
  step = 1,
  onChange,
}: SliderControlProps) {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className="text-sm font-medium text-burgundy">{label}</label>
        <span className="text-sm font-medium text-burgundy tabular-nums">
          {displayValue}{unit}
        </span>
      </div>
      <p className="text-xs text-burgundy/50 mb-2">{helper}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray rounded-full appearance-none cursor-pointer slider-thumb"
        style={{
          background: `linear-gradient(to right, #4a1c2f ${percentage}%, #d4cfc9 ${percentage}%)`,
        }}
      />
    </div>
  )
}
