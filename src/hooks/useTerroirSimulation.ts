import { useMemo } from 'react'
import { regions, grapes } from '../data/terroirData'
import type { Region, Grape, FlavorProfile, ClimateRange } from '../data/terroirData'

export interface TerroirInput {
  temperature: number
  rainfall: number
  altitude: number
  soilType: string
}

export interface ScoredRegion extends Region {
  score: number
}

export interface ScoredGrape extends Grape {
  score: number
}

export interface SimulationResult {
  matchedRegions: ScoredRegion[]
  matchedGrapes: ScoredGrape[]
  derivedFlavorProfile: FlavorProfile
}

/**
 * Calculate distance from a value to the midpoint of a range.
 * Returns 0 if value is at midpoint, higher values mean further away.
 */
function distanceFromMidpoint(value: number, range: [number, number]): number {
  const midpoint = (range[0] + range[1]) / 2
  const halfSpan = (range[1] - range[0]) / 2
  // Normalize distance relative to the range span
  return halfSpan > 0 ? Math.abs(value - midpoint) / halfSpan : Math.abs(value - midpoint)
}

/**
 * Convert distance to a score (0-100). Lower distance = higher score.
 */
function distanceToScore(distance: number): number {
  // Use exponential decay: score drops as distance increases
  return Math.max(0, 100 * Math.exp(-distance))
}

/**
 * Check if a soil type matches any in the preferred soils list (case-insensitive partial match).
 */
function soilMatches(inputSoil: string, preferredSoils: string[]): boolean {
  const input = inputSoil.toLowerCase()
  return preferredSoils.some(soil => soil.toLowerCase().includes(input) || input.includes(soil.toLowerCase()))
}

/**
 * Calculate climate match score for a given climate range.
 */
function calculateClimateScore(input: TerroirInput, climate: ClimateRange): number {
  const tempDistance = distanceFromMidpoint(input.temperature, climate.temperature)
  const rainDistance = distanceFromMidpoint(input.rainfall, climate.rainfall)
  const altDistance = distanceFromMidpoint(input.altitude, climate.altitude)

  // Weight temperature slightly higher as it's most critical
  const tempScore = distanceToScore(tempDistance) * 1.2
  const rainScore = distanceToScore(rainDistance)
  const altScore = distanceToScore(altDistance)

  // Base climate score (average of weighted components)
  let score = (tempScore + rainScore + altScore) / 3.2

  // Soil bonus: add up to 15 points if soil matches
  if (soilMatches(input.soilType, climate.soils)) {
    score += 15
  }

  return Math.min(100, score)
}

/**
 * Score a region against the input terroir parameters.
 */
function scoreRegion(input: TerroirInput, region: Region): number {
  return calculateClimateScore(input, region.climate)
}

/**
 * Score a grape against the input terroir parameters.
 */
function scoreGrape(input: TerroirInput, grape: Grape): number {
  return calculateClimateScore(input, grape.preferredClimate)
}

/**
 * Average multiple flavor profiles into one.
 */
function averageFlavorProfiles(profiles: FlavorProfile[]): FlavorProfile {
  if (profiles.length === 0) {
    return { acidity: 3, tannin: 3, body: 3, fruitiness: 3, earthiness: 3 }
  }

  const sum = profiles.reduce(
    (acc, p) => ({
      acidity: acc.acidity + p.acidity,
      tannin: acc.tannin + p.tannin,
      body: acc.body + p.body,
      fruitiness: acc.fruitiness + p.fruitiness,
      earthiness: acc.earthiness + p.earthiness,
    }),
    { acidity: 0, tannin: 0, body: 0, fruitiness: 0, earthiness: 0 }
  )

  const count = profiles.length
  return {
    acidity: Math.round((sum.acidity / count) * 10) / 10,
    tannin: Math.round((sum.tannin / count) * 10) / 10,
    body: Math.round((sum.body / count) * 10) / 10,
    fruitiness: Math.round((sum.fruitiness / count) * 10) / 10,
    earthiness: Math.round((sum.earthiness / count) * 10) / 10,
  }
}

/**
 * Hook to simulate terroir matching based on climate and soil inputs.
 */
export function useTerroirSimulation(input: TerroirInput): SimulationResult {
  return useMemo(() => {
    // Score all regions
    const scoredRegions: ScoredRegion[] = regions
      .map(region => ({
        ...region,
        score: Math.round(scoreRegion(input, region) * 10) / 10,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)

    // Score all grapes
    const scoredGrapes: ScoredGrape[] = grapes
      .map(grape => ({
        ...grape,
        score: Math.round(scoreGrape(input, grape) * 10) / 10,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8)

    // Derive flavor profile from matched grapes
    const derivedFlavorProfile = averageFlavorProfiles(
      scoredGrapes.map(g => g.flavorProfile)
    )

    return {
      matchedRegions: scoredRegions,
      matchedGrapes: scoredGrapes,
      derivedFlavorProfile,
    }
  }, [input.temperature, input.rainfall, input.altitude, input.soilType])
}

