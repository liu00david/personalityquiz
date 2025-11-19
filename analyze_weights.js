// Analyze question weights from summation perspective
const fs = require('fs');
const content = fs.readFileSync('questions.js', 'utf8');

// Extract questions array using regex
const questionsMatch = content.match(/const questions = \[([\s\S]*?)\];/);
if (!questionsMatch) {
  console.error('Could not find questions array');
  process.exit(1);
}

// Parse the questions array
const questionsStr = questionsMatch[1];
const questions = [];

// Simple parser for the questions
const questionRegex = /\{\s*text:\s*"([^"]+)",\s*weights:\s*\[([^\]]+)\]\s*\}/g;
let match;
while ((match = questionRegex.exec(questionsStr)) !== null) {
  const text = match[1];
  const weightsStr = match[2];
  const weights = weightsStr.split(',').map(w => parseFloat(w.trim()));
  questions.push({ text, weights });
}

// Calculate sums for each dimension
const sums = {
  IR: { positive: 0, negative: 0, total: 0, absTotal: 0 },
  PE: { positive: 0, negative: 0, total: 0, absTotal: 0 },
  SV: { positive: 0, negative: 0, total: 0, absTotal: 0 },
  FC: { positive: 0, negative: 0, total: 0, absTotal: 0 }
};

questions.forEach(q => {
  const weights = q.weights;
  for (let i = 0; i < 4; i++) {
    const dim = ['IR', 'PE', 'SV', 'FC'][i];
    const weight = weights[i];
    
    sums[dim].absTotal += Math.abs(weight);
    
    if (weight > 0) {
      sums[dim].positive += weight;
    } else if (weight < 0) {
      sums[dim].negative += weight;
    }
    
    sums[dim].total += weight;
  }
});

console.log('=== WEIGHT SUMMATION ANALYSIS ===\n');
console.log('Dimension | Positive Sum | Negative Sum | Net Sum | Abs Total');
console.log('----------|---------------|--------------|---------|----------');

['IR', 'PE', 'SV', 'FC'].forEach(dim => {
  const s = sums[dim];
  console.log(`${dim.padEnd(9)} | ${s.positive.toFixed(2).padStart(13)} | ${s.negative.toFixed(2).padStart(12)} | ${s.total.toFixed(2).padStart(7)} | ${s.absTotal.toFixed(2).padStart(9)}`);
});

console.log('\n=== MAXIMUM ACHIEVABLE SCORES ===\n');

// Calculate max possible scores for each dimension
const maxScores = { IR: 0, PE: 0, SV: 0, FC: 0 };
const maxPositiveScores = { IR: 0, PE: 0, SV: 0, FC: 0 };
const maxNegativeScores = { IR: 0, PE: 0, SV: 0, FC: 0 };

questions.forEach(q => {
  const weights = q.weights;
  for (let i = 0; i < 4; i++) {
    const dim = ['IR', 'PE', 'SV', 'FC'][i];
    const weight = weights[i];
    
    // Max possible score (absolute value * 2, since max answer is 2)
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

console.log('Trait     | Max Score | Can Reach 100%?');
console.log('----------|-----------|-----------------');
console.log('I (Idealist):', maxPositiveScores.IR === maxScores.IR ? '✅ YES' : '❌ NO', `(${maxPositiveScores.IR.toFixed(2)} vs ${maxScores.IR.toFixed(2)})`);
console.log('R (Realist):', Math.abs(maxNegativeScores.IR) === maxScores.IR ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.IR).toFixed(2)} vs ${maxScores.IR.toFixed(2)})`);
console.log('P (Physical):', maxPositiveScores.PE === maxScores.PE ? '✅ YES' : '❌ NO', `(${maxPositiveScores.PE.toFixed(2)} vs ${maxScores.PE.toFixed(2)})`);
console.log('E (Emotional):', Math.abs(maxNegativeScores.PE) === maxScores.PE ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.PE).toFixed(2)} vs ${maxScores.PE.toFixed(2)})`);
console.log('S (Social):', maxPositiveScores.SV === maxScores.SV ? '✅ YES' : '❌ NO', `(${maxPositiveScores.SV.toFixed(2)} vs ${maxScores.SV.toFixed(2)})`);
console.log('V (Private):', Math.abs(maxNegativeScores.SV) === maxScores.SV ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.SV).toFixed(2)} vs ${maxScores.SV.toFixed(2)})`);
console.log('F (Forgiving):', maxPositiveScores.FC === maxScores.FC ? '✅ YES' : '❌ NO', `(${maxPositiveScores.FC.toFixed(2)} vs ${maxScores.FC.toFixed(2)})`);
console.log('C (Critical):', Math.abs(maxNegativeScores.FC) === maxScores.FC ? '✅ YES' : '❌ NO', `(${Math.abs(maxNegativeScores.FC).toFixed(2)} vs ${maxScores.FC.toFixed(2)})`);

console.log('\n=== BALANCE ASSESSMENT ===\n');
['IR', 'PE', 'SV', 'FC'].forEach(dim => {
  const s = sums[dim];
  const balance = Math.abs(s.positive) / (Math.abs(s.positive) + Math.abs(s.negative));
  const imbalance = Math.abs(s.total) / s.absTotal;
  console.log(`${dim}: ${(balance * 100).toFixed(1)}% positive weights, ${(imbalance * 100).toFixed(1)}% net imbalance`);
});
