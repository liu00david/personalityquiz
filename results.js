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
  const { type, scores } = results;

  // Display main type
  document.getElementById('typeBadge').textContent = type;
  const typeData = typeDescriptions[type];
  document.getElementById('typeName').textContent = typeData.name;
  document.getElementById('typeDescription').textContent = typeData.description;

  // Display dimension cards
  const letters = type.split('');
  const dimensions = [
    { letter: letters[0], title: 'Hope', options: 'I/R' },
    { letter: letters[1], title: 'Connection', options: 'P/E' },
    { letter: letters[2], title: 'Expression', options: 'S/V' },
    { letter: letters[3], title: 'Conflict', options: 'F/C' }
  ];

  dimensions.forEach((dim, index) => {
    const card = document.getElementById(`dim${index + 1}`);
    card.innerHTML = `
      <div class="dimension-title">${dim.title}</div>
      <div class="dimension-value">${dim.letter}</div>
      <div class="dimension-label">${dimensionInfo[dim.letter].name}</div>
    `;
  });

  // Display detailed dimension information
  document.getElementById('hopeDimension').innerHTML = `
    <div class="detail-content">
      <strong>${dimensionInfo[letters[0]].name}</strong> — ${dimensionInfo[letters[0]].subtitle}<br>
      ${dimensionInfo[letters[0]].description}
    </div>
  `;

  document.getElementById('connectionDimension').innerHTML = `
    <div class="detail-content">
      <strong>${dimensionInfo[letters[1]].name}</strong> — ${dimensionInfo[letters[1]].subtitle}<br>
      ${dimensionInfo[letters[1]].description}
    </div>
  `;

  document.getElementById('expressionDimension').innerHTML = `
    <div class="detail-content">
      <strong>${dimensionInfo[letters[2]].name}</strong> — ${dimensionInfo[letters[2]].subtitle}<br>
      ${dimensionInfo[letters[2]].description}
    </div>
  `;

  document.getElementById('conflictDimension').innerHTML = `
    <div class="detail-content">
      <strong>${dimensionInfo[letters[3]].name}</strong> — ${dimensionInfo[letters[3]].subtitle}<br>
      ${dimensionInfo[letters[3]].description}
    </div>
  `;
}

function shareResults() {
  const type = results.type;
  const typeData = typeDescriptions[type];
  const shareText = `I just discovered my IRSP type: ${type} - ${typeData.name}! Find your romantic personality type.`;

  if (navigator.share) {
    navigator.share({
      title: 'My IRSP Personality Type',
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
