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

// Pixel Avatar Generator
function generatePixelAvatar(type, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Get colors for this type
  const traitColors = {
    I: '#ffc6ff', R: '#caffbf', P: '#ffadad', E: '#bdb2ff',
    S: '#ffd6a5', V: '#9bf6ff', F: '#a0c4ff', C: '#fdffb6'
  };

  const colors = type.split('').map(letter => traitColors[letter]);

  // Create deterministic pattern based on type
  const gridSize = 8; // 8x8 pixel grid
  const pixelSize = size / gridSize;

  // Use type string to seed pattern
  const seed = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Simple seeded random function
  let randomSeed = seed;
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };

  // Generate symmetrical pattern (mirror horizontally)
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < Math.ceil(gridSize / 2); x++) {
      const shouldFill = seededRandom() > 0.5;

      if (shouldFill) {
        // Pick color based on position
        const colorIndex = Math.floor(seededRandom() * colors.length);
        ctx.fillStyle = colors[colorIndex];

        // Fill pixel and its mirror
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        ctx.fillRect((gridSize - 1 - x) * pixelSize, y * pixelSize, pixelSize, pixelSize);
      }
    }
  }

  return canvas;
}

function displayResults(results) {
  const { type, scores, rawScores } = results;

  // Display main type
  document.getElementById('typeBadge').textContent = type;
  const typeData = typeDescriptions[type];
  document.getElementById('typeName').textContent = typeData.name;
  document.getElementById('typeArchetype').textContent = typeData.archetype;
  document.getElementById('typeDescription').textContent = typeData.description;

  // Generate and set pixel avatar locally
  const avatarCanvas = generatePixelAvatar(type, 150);
  const avatarImg = document.getElementById('typeAvatar');
  avatarImg.src = avatarCanvas.toDataURL();

  // Calculate max possible scores for each dimension based on question weights
  // Max score = sum of absolute values of all weights * 2 (for "Strong Agree")
  const maxScores = {
    IR: 0,
    PE: 0,
    SV: 0,
    FC: 0
  };

  questions.forEach(q => {
    maxScores.IR += Math.abs(q.weights[0]) * 2;
    maxScores.PE += Math.abs(q.weights[1]) * 2;
    maxScores.SV += Math.abs(q.weights[2]) * 2;
    maxScores.FC += Math.abs(q.weights[3]) * 2;
  });

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

  // Analyze strength of each dimension
  const dimensions = [
    { pair: 'IR', first: 'I', second: 'R', title: 'Hope', firstLabel: 'Idealist', secondLabel: 'Realist' },
    { pair: 'PE', first: 'P', second: 'E', title: 'Connection', firstLabel: 'Physical', secondLabel: 'Emotional' },
    { pair: 'SV', first: 'S', second: 'V', title: 'Expression', firstLabel: 'Social', secondLabel: 'Private' },
    { pair: 'FC', first: 'F', second: 'C', title: 'Resolution', firstLabel: 'Forgiving', secondLabel: 'Critical' }
  ];

  const strongTraits = [];
  const balancedTraits = [];

  dimensions.forEach((dim, index) => {
    const firstPercent = percentages[dim.first];
    const secondPercent = percentages[dim.second];
    const userLetter = letters[index];
    const dominantPercent = Math.max(firstPercent, secondPercent);
    const dominantLabel = firstPercent > secondPercent ? dim.firstLabel : dim.secondLabel;

    if (dominantPercent >= 60) {
      strongTraits.push({ label: dominantLabel, percent: dominantPercent, title: dim.title });
    } else if (dominantPercent <= 55) {
      balancedTraits.push({
        first: dim.firstLabel,
        second: dim.secondLabel,
        firstPercent,
        secondPercent,
        title: dim.title
      });
    }
  });

  // Generate personalized insights
  let insightsText = '';

  if (strongTraits.length > 0) {
    const traitList = strongTraits.map(t => `${t.label} (${t.percent}%)`).join(', ');
    insightsText += `Your strongest ${strongTraits.length === 1 ? 'trait is' : 'traits are'} ${traitList}. ${strongTraits.length === 1 ? 'This dimension shapes' : 'These dimensions shape'} your relationship style, and you may find the most compatibility with someone who shares them. `;
  }

  if (balancedTraits.length > 0) {
    const balancedList = balancedTraits.map(t => `${t.title} (${t.firstPercent}% ${t.first}, ${t.secondPercent}% ${t.second})`).join(', ');
    insightsText += `You show balance in: ${balancedList}. This indicates you can shift between both tendencies, responding to what the situation or relationship needs. `;
  }

  if (insightsText === '' || balancedTraits.length == 4) {
    insightsText = 'Your results are balanced across all dimensions, giving you a flexible relationship style. For a clearer type, try retaking the quiz with more decisive answers. ';
  }

  document.getElementById('insightsText').textContent = insightsText;

  const breakdownContainer = document.getElementById('dimensionsBreakdown');
  breakdownContainer.innerHTML = '';

  dimensions.forEach((dim, index) => {
    const firstPercent = percentages[dim.first];
    const secondPercent = percentages[dim.second];
    const userLetter = letters[index];

    // Determine fill direction and width
    const fillFromLeft = firstPercent >= secondPercent;
    const barWidth = fillFromLeft ? firstPercent : secondPercent;

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
            <div class="bar-fill-single ${fillFromLeft ? 'fill-left' : 'fill-right'}" style="width: ${barWidth}%"></div>
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
