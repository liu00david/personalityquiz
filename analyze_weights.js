// Analyze if 100% is achievable for each trait
const fs = require('fs');
const content = fs.readFileSync('questions.js', 'utf8');
eval(content);

// Calculate max possible scores for each dimension
const maxScores = { IR: 0, PE: 0, SV: 0, FC: 0 };
const maxPositiveScores = { IR: 0, PE: 0, SV: 0, FC: 0 };
const maxNegativeScores = { IR: 0, PE: 0, SV: 0, FC: 0 };

questions.forEach(q => {
  const weights = q.weights;
  for (let i = 0; i < 4; i++) {
    const dim = ['IR', 'PE', 'SV', 'FC'][i];
    const weight = weights[i];
    
    // Max possible score (absolute value * 2)
    maxScores[dim] += Math.abs(weight) * 2;
    
    // Max positive score (if weight > 0, answer 2; if weight < 0, answer -2)
    if (weight > 0) {
      maxPositiveScores[dim] += weight * 2;
    } else if (weight < 0) {
      maxPositiveScores[dim] += weight * -2; // negative weight * -2 = positive
    }
    
    // Max negative score (if weight > 0, answer -2; if weight < 0, answer 2)
    if (weight > 0) {
      maxNegativeScores[dim] += weight * -2;
    } else if (weight < 0) {
      maxNegativeScores[dim] += weight * 2; // negative weight * 2 = negative
    }
  }
});

console.log('Max possible scores (theoretical max):');
console.log(JSON.stringify(maxScores, null, 2));
console.log('\nMax positive scores (can we get 100% on left traits?):');
console.log(JSON.stringify(maxPositiveScores, null, 2));
console.log('\nMax negative scores (can we get 100% on right traits?):');
console.log(JSON.stringify(maxNegativeScores, null, 2));
console.log('\n=== Can we achieve 100%? ===');
console.log('I (Idealist):', maxPositiveScores.IR === maxScores.IR ? '✅ YES' : '❌ NO', `(${maxPositiveScores.IR} vs ${maxScores.IR})`);
console.log('R (Realist):', Math.abs(maxNegativeScores.IR) === maxScores.IR ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.IR)} vs ${maxScores.IR})`);
console.log('P (Physical):', maxPositiveScores.PE === maxScores.PE ? '✅ YES' : '❌ NO', `(${maxPositiveScores.PE} vs ${maxScores.PE})`);
console.log('E (Emotional):', Math.abs(maxNegativeScores.PE) === maxScores.PE ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.PE)} vs ${maxScores.PE})`);
console.log('S (Social):', maxPositiveScores.SV === maxScores.SV ? '✅ YES' : '❌ NO', `(${maxPositiveScores.SV} vs ${maxScores.SV})`);
console.log('V (Private):', Math.abs(maxNegativeScores.SV) === maxScores.SV ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.SV)} vs ${maxScores.SV})`);
console.log('F (Forgiving):', maxPositiveScores.FC === maxScores.FC ? '✅ YES' : '❌ NO', `(${maxPositiveScores.FC} vs ${maxScores.FC})`);
console.log('C (Critical):', Math.abs(maxNegativeScores.FC) === maxScores.FC ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.FC)} vs ${maxScores.FC})`);

