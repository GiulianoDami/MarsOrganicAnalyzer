export class OriginProbabilityService {
  private readonly ABIOticThreshold = 0.3;
  private readonly BIOTicThreshold = 0.7;

  /**
   * Calculates the probability that organic compounds originated from biotic sources
   * @param molecularWeight - The molecular weight of the compound
   * @param carbonCount - Number of carbon atoms in the molecule
   * @param heteroatomCount - Number of heteroatoms (O, N, S, etc.)
   * @param ringCount - Number of rings in the molecular structure
   * @returns Probability value between 0 and 1
   */
  calculateBioticProbability(
    molecularWeight: number,
    carbonCount: number,
    heteroatomCount: number,
    ringCount: number
  ): number {
    // Base probability calculation based on molecular complexity
    let baseProbability = 0;
    
    // Higher carbon count generally favors biotic origin
    if (carbonCount >= 6) {
      baseProbability += 0.3;
    } else if (carbonCount >= 3) {
      baseProbability += 0.15;
    }
    
    // Heteroatoms often indicate biotic origin
    if (heteroatomCount >= 2) {
      baseProbability += 0.25;
    } else if (heteroatomCount === 1) {
      baseProbability += 0.1;
    }
    
    // Ring structures more common in biotic compounds
    if (ringCount >= 1) {
      baseProbability += 0.2;
    }
    
    // Molecular weight considerations
    if (molecularWeight > 100 && molecularWeight < 500) {
      baseProbability += 0.15;
    } else if (molecularWeight >= 500) {
      baseProbability -= 0.1;
    }
    
    // Clamp probability between 0 and 1
    return Math.max(0, Math.min(1, baseProbability));
  }

  /**
   * Determines if the compound is likely biotic or abiotic based on probability
   * @param probability - Calculated biotic probability
   * @returns 'biotic', 'abiotic', or 'uncertain'
   */
  classifyOrigin(probability: number): 'biotic' | 'abiotic' | 'uncertain' {
    if (probability >= this.BIOTicThreshold) {
      return 'biotic';
    } else if (probability <= this.ABIOticThreshold) {
      return 'abiotic';
    } else {
      return 'uncertain';
    }
  }

  /**
   * Analyzes multiple compounds and returns classification results
   * @param compounds - Array of compound data objects
   * @returns Array of classification results
   */
  analyzeCompounds(compounds: {
    molecularWeight: number;
    carbonCount: number;
    heteroatomCount: number;
    ringCount: number;
  }[]): {
    probability: number;
    classification: 'biotic' | 'abiotic' | 'uncertain';
  }[] {
    return compounds.map(compound => {
      const probability = this.calculateBioticProbability(
        compound.molecularWeight,
        compound.carbonCount,
        compound.heteroatomCount,
        compound.ringCount
      );
      
      const classification = this.classifyOrigin(probability);
      
      return { probability, classification };
    });
  }
}