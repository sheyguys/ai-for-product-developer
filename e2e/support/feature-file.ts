import { readFileSync } from 'node:fs'

export type FeatureScenario = {
  name: string
  steps: string[]
}

export type FeatureDefinition = {
  name: string
  scenarios: FeatureScenario[]
}

const stepPrefixes = ['Given ', 'When ', 'Then ', 'And ', 'But ']

export function loadFeatureFile(filePath: string): FeatureDefinition {
  const content = readFileSync(filePath, 'utf8')
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const featureLine = lines.find((line) => line.startsWith('Feature: '))

  if (!featureLine) {
    throw new Error(`Missing "Feature:" declaration in ${filePath}`)
  }

  const scenarios: FeatureScenario[] = []
  let currentScenario: FeatureScenario | null = null

  for (const line of lines) {
    if (line.startsWith('Scenario: ')) {
      currentScenario = {
        name: line.replace('Scenario: ', '').trim(),
        steps: [],
      }
      scenarios.push(currentScenario)
      continue
    }

    if (stepPrefixes.some((prefix) => line.startsWith(prefix))) {
      if (!currentScenario) {
        throw new Error(`Found step before scenario in ${filePath}: ${line}`)
      }

      currentScenario.steps.push(line)
    }
  }

  return {
    name: featureLine.replace('Feature: ', '').trim(),
    scenarios,
  }
}
