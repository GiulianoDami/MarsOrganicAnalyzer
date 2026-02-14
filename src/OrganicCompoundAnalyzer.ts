export class OrganicCompoundAnalyzer {
  private readonly abioticThreshold: number = 0.7;
  
  public analyzeOrigin(compound: string, molecularWeight: number, complexityScore: number): 'biotic' | 'abiotic' | 'uncertain' {
    // Check if compound is in our known abiotic list
    const abioticCompounds = ['decane', 'undecane', 'dodecane'];
    if (abioticCompounds.includes(compound.toLowerCase())) {
      // For these specific compounds, check if complexity suggests biotic origin
      if (complexityScore > 0.8 && molecularWeight > 140) {
        return 'biotic';
      } else if (complexityScore < 0.5) {
        return 'abiotic';
      }
    }
    
    // General heuristic: higher complexity and weight suggest biotic origin
    const score = this.calculateOriginScore(molecularWeight, complexityScore);
    
    if (score > this.abioticThreshold) {
      return 'biotic';
    } else if (score < 0.3) {
      return 'abiotic';
    } else {
      return 'uncertain';
    }
  }
  
  private calculateOriginScore(molecularWeight: number, complexityScore: number): number {
    // Normalize molecular weight (assuming typical range)
    const normalizedWeight = Math.min(1, molecularWeight / 500);
    
    // Combine weight and complexity scores
    return (normalizedWeight * 0.4) + (complexityScore * 0.6);
  }
}