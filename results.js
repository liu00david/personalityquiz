// Results page functionality

const dimensionInfo = {
  I: {
    name: "Idealist",
    subtitle: "The Dreamer",
    description: "You approach love with hope, imagination, and emotional possibility. You see relationships as growth journeys and believe in the power of romance."
  },
  R: {
    name: "Realist",
    subtitle: "The Grounded One",
    description: "You value clarity, structure, and well-defined expectations. You're honest, stable, and intentional in building strong relationships deliberately."
  },
  P: {
    name: "Physical",
    subtitle: "The Tangible Lover",
    description: "You connect through presence, touch, and practical care. You show love by doing and showing up, with touch-oriented affection."
  },
  E: {
    name: "Emotional",
    subtitle: "The Inner Connector",
    description: "You connect through emotional depth, meaning, and intuition. You value vulnerability, deep conversations, and shared worldviews."
  },
  S: {
    name: "Social",
    subtitle: "The Outward Lover",
    description: "You're expressive, open, and outward with affection. You're comfortable with PDA, share relationship moments socially, and bring energetic warmth."
  },
  V: {
    name: "Private",
    subtitle: "The Inner Circle Lover",
    description: "You're reserved, intentional, and intimate. You prefer meaningful one-on-one time, minimal PDA, and express love subtly and deeply."
  },
  F: {
    name: "Forgiving",
    subtitle: "The Soft-Hearted",
    description: "You're empathetic and harmony-focused. You're quick to understand and move on, rarely hold grudges, and prioritize maintaining peace."
  },
  C: {
    name: "Critical",
    subtitle: "The Standard-Holder",
    description: "You're direct, analytical, and growth-oriented. You hold yourself and partners to clear standards and believe in accountability."
  }
};

// Get results from sessionStorage
const results = JSON.parse(sessionStorage.getItem('quizResults'));

if (!results) {
  window.location.href = 'index.html';
} else {
  displayResults(results);
}

function displayResults(results) {
  const { type, scores, rawScores } = results;

  // Display main type
  document.getElementById('typeBadge').textContent = type;
  const typeData = typeDescriptions[type];
  document.getElementById('typeName').textContent = typeData.name;
  document.getElementById('typeArchetype').textContent = typeData.archetype;
  document.getElementById('typeDescription').textContent = typeData.description;

  // Calculate percentages for each dimension
  // Count max possible points per dimension (13 questions * 2 points = 26 for IR/PE, 12 * 2 = 24 for SV/FC)
  const maxScores = {
    IR: 13 * 2,  // 26
    PE: 13 * 2,  // 26
    SV: 12 * 2,  // 24
    FC: 12 * 2   // 24
  };

  const letters = type.split('');

  // Calculate percentages (0-100 scale for each side)
  const percentages = {
    I: Math.round(((rawScores.IR + maxScores.IR) / (2 * maxScores.IR)) * 100),
    R: Math.round(((-rawScores.IR + maxScores.IR) / (2 * maxScores.IR)) * 100),
    P: Math.round(((rawScores.PE + maxScores.PE) / (2 * maxScores.PE)) * 100),
    E: Math.round(((-rawScores.PE + maxScores.PE) / (2 * maxScores.PE)) * 100),
    S: Math.round(((rawScores.SV + maxScores.SV) / (2 * maxScores.SV)) * 100),
    V: Math.round(((-rawScores.SV + maxScores.SV) / (2 * maxScores.SV)) * 100),
    F: Math.round(((rawScores.FC + maxScores.FC) / (2 * maxScores.FC)) * 100),
    C: Math.round(((-rawScores.FC + maxScores.FC) / (2 * maxScores.FC)) * 100)
  };

  // Display dimension breakdown with percentage bars
  const dimensions = [
    { pair: 'IR', first: 'I', second: 'R', title: 'Hope Dimension', firstLabel: 'Idealist', secondLabel: 'Realist' },
    { pair: 'PE', first: 'P', second: 'E', title: 'Connection Dimension', firstLabel: 'Physical', secondLabel: 'Emotional' },
    { pair: 'SV', first: 'S', second: 'V', title: 'Expression Dimension', firstLabel: 'Social', secondLabel: 'Private' },
    { pair: 'FC', first: 'F', second: 'C', title: 'Resolution Dimension', firstLabel: 'Forgiving', secondLabel: 'Critical' }
  ];

  const breakdownContainer = document.getElementById('dimensionsBreakdown');
  breakdownContainer.innerHTML = '';

  dimensions.forEach((dim, index) => {
    const firstPercent = percentages[dim.first];
    const secondPercent = percentages[dim.second];
    const userLetter = letters[index];

    // Determine which side is higher
    const higherSide = firstPercent >= secondPercent ? dim.first : dim.second;
    const higherPercent = Math.max(firstPercent, secondPercent);

    const dimElement = document.createElement('div');
    dimElement.className = 'dimension-breakdown';
    dimElement.innerHTML = `
      <h4>${dim.title}</h4>
      <div class="percentage-bar-container">
        <div class="percentage-side">
          <span class="percentage-label ${userLetter === dim.first ? 'active' : ''}">${dim.firstLabel}</span>
          <span class="percentage-value ${userLetter === dim.first ? 'active' : ''}">${firstPercent}%</span>
        </div>
        <div class="percentage-bar-single">
          <div class="bar-track-single">
            <div class="bar-fill-single ${higherSide === dim.first ? 'left' : 'right'}" style="width: ${higherPercent}%"></div>
          </div>
        </div>
        <div class="percentage-side">
          <span class="percentage-label ${userLetter === dim.second ? 'active' : ''}">${dim.secondLabel}</span>
          <span class="percentage-value ${userLetter === dim.second ? 'active' : ''}">${secondPercent}%</span>
        </div>
      </div>
    `;
    breakdownContainer.appendChild(dimElement);
  });
}

function shareResults() {
  const type = results.type;
  const typeData = typeDescriptions[type];
  const shareText = `I just discovered my HCER type: ${type} - ${typeData.name}! Find your romantic personality type.`;

  if (navigator.share) {
    navigator.share({
      title: 'My HCER Personality Type',
      text: shareText,
      url: window.location.origin
    }).catch(() => {
      // Fallback to clipboard
      copyToClipboard(shareText);
    });
  } else {
    copyToClipboard(shareText + ' ' + window.location.origin);
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      alert('Results copied to clipboard!');
    });
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('Results copied to clipboard!');
  }
}
