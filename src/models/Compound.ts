export interface Compound {
  name: string;
  formula: string;
  molecularWeight: number;
  structure: string;
  origin?: 'biotic' | 'abiotic' | 'unknown';
  detectionMethod: string;
  confidenceScore?: number;
}