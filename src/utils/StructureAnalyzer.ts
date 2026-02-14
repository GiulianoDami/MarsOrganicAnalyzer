export class StructureAnalyzer {
  private static readonly BIOTIC_THRESHOLD = 0.7;
  private static readonly ABIOtic_THRESHOLD = 0.3;

  /**
   * Analyzes a molecular structure for biotic signatures
   * @param molecularFormula - The chemical formula of the molecule
   * @returns Analysis result with biotic probability score
   */
  public analyzeStructure(molecularFormula: string): {
    bioticProbability: number;
    isBioticLikely: boolean;
    confidence: number;
  } {
    // Simple heuristic-based analysis
    const carbonCount = this.countCarbonAtoms(molecularFormula);
    const hydrogenCount = this.countHydrogenAtoms(molecularFormula);
    const ratio = carbonCount > 0 ? hydrogenCount / carbonCount : 0;
    
    // Calculate biotic probability based on carbon-hydrogen ratio
    let bioticProbability = 0;
    
    if (carbonCount >= 10 && ratio >= 1.5) {
      bioticProbability = 0.9;
    } else if (carbonCount >= 5 && ratio >= 1.2) {
      bioticProbability = 0.7;
    } else if (carbonCount >= 3 && ratio >= 1.0) {
      bioticProbability = 0.5;
    } else {
      bioticProbability = 0.2;
    }
    
    // Adjust based on specific molecular patterns
    if (this.containsAminoAcidPattern(molecularFormula)) {
      bioticProbability = Math.min(1.0, bioticProbability + 0.3);
    }
    
    if (this.containsNucleotidePattern(molecularFormula)) {
      bioticProbability = Math.min(1.0, bioticProbability + 0.4);
    }
    
    // Ensure probability stays within bounds
    bioticProbability = Math.max(0, Math.min(1, bioticProbability));
    
    return {
      bioticProbability,
      isBioticLikely: bioticProbability >= StructureAnalyzer.BIOTIC_THRESHOLD,
      confidence: Math.abs(bioticProbability - 0.5) * 2
    };
  }

  /**
   * Counts carbon atoms in a molecular formula
   */
  private countCarbonAtoms(formula: string): number {
    const matches = formula.match(/C(\d*)/);
    return matches && matches[1] ? parseInt(matches[1], 10) : 1;
  }

  /**
   * Counts hydrogen atoms in a molecular formula
   */
  private countHydrogenAtoms(formula: string): number {
    const matches = formula.match(/H(\d*)/);
    return matches && matches[1] ? parseInt(matches[1], 10) : 1;
  }

  /**
   * Checks if formula contains amino acid-like patterns
   */
  private containsAminoAcidPattern(formula: string): boolean {
    return /C\d+H\d+N\d+O\d+/.test(formula) || 
           /NH2/.test(formula) || 
           /COOH/.test(formula);
  }

  /**
   * Checks if formula contains nucleotide-like patterns
   */
  private containsNucleotidePattern(formula: string): boolean {
    return /C\d+H\d+N\d+O\d+P/.test(formula) || 
           /phosphate/.test(formula) || 
           /adenine|guanine|cytosine|thymine|uracil/.test(formula.toLowerCase());
  }
}