PROJECT_NAME: MarsOrganicAnalyzer

# MarsOrganicAnalyzer

A TypeScript tool for analyzing and distinguishing between biotic and abiotic origins of organic compounds detected on Mars, helping scientists determine whether mysterious organic molecules could have been produced by living organisms or geological processes.

## Description

This project addresses the scientific challenge presented by NASA's discovery of large organic molecules (decane, undecane, and dodecane) on Mars. While these compounds may indicate potential biological activity, they can also be formed through abiotic processes like meteorite impacts. MarsOrganicAnalyzer provides a framework for scientists to evaluate the likelihood that detected organic compounds originated from biological processes versus geological ones, using comparative analysis of molecular structures and formation pathways.

The tool helps answer critical questions:
- Are the detected organic molecules too complex for purely abiotic formation?
- What is the probability that these compounds originated from biological processes?
- How do the concentrations compare to what would be expected from meteorite impacts?

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/marsorganicanalyzer.git
cd marsorganicanalyzer

# Install dependencies
npm install

# Compile TypeScript to JavaScript
npm run build
```

## Usage

```typescript
import { OrganicCompoundAnalyzer } from './src/OrganicCompoundAnalyzer';

// Analyze detected organic compounds
const analyzer = new OrganicCompoundAnalyzer();

const detectedCompounds = [
  { name: 'decane', concentration: 2.5 },
  { name: 'undecane', concentration: 1.8 },
  { name: 'dodecane', concentration: 3.2 }
];

// Run analysis to determine likely origin
const results = analyzer.analyzeCompoundOrigin(detectedCompounds);

console.log('Analysis Results:', results);
// Output will show probability scores for biotic vs abiotic origins
```

## Features

- **Molecular Structure Analysis**: Compares detected compounds against known biotic and abiotic formation patterns
- **Probability Calculation**: Provides statistical likelihood of biological vs geological origins
- **Concentration Modeling**: Evaluates if detected quantities exceed abiotic formation thresholds
- **Meteorite Impact Simulation**: Models how meteorite impacts might produce similar compounds
- **Fatty Acid Fragment Detection**: Identifies potential fatty acid precursors that could indicate biological activity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE file for details.