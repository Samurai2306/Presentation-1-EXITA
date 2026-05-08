import type { PerfProfile } from "@/lib/perfGating";

export type PerfTier = PerfProfile;

export type QuantumNeuralPaletteIndex = 0 | 1 | 2;

export type QuantumNeuralFormationIndex = 0 | 1 | 2;

export type QuantumNeuralRuntimeOptions = {
  perfTier: PerfTier;
  transparentCanvas?: boolean;
  interactive?: boolean;
  paletteIndex?: QuantumNeuralPaletteIndex;
  formationIndex?: QuantumNeuralFormationIndex;
  densityFactor?: number;
};
