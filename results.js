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
  // Count max possible points per dimension (10 questions * 2 points = 20 for all)
  const maxScores = {
    IR: 10 * 2,  // 20
    PE: 10 * 2,  // 20
    SV: 10 * 2,  // 20
    FC: 10 * 2   // 20
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

  // Adjust 50-50 ties to 51-49 (lean left)
  if (percentages.I === 50) { percentages.I = 51; percentages.R = 49; }
  if (percentages.P === 50) { percentages.P = 51; percentages.E = 49; }
  if (percentages.S === 50) { percentages.S = 51; percentages.V = 49; }
  if (percentages.F === 50) { percentages.F = 51; percentages.C = 49; }

  // Display dimension breakdown with percentage bars
  const dimensions = [
    { pair: 'IR', first: 'I', second: 'R', title: 'Hope', firstLabel: 'Idealist', secondLabel: 'Realist' },
    { pair: 'PE', first: 'P', second: 'E', title: 'Connection', firstLabel: 'Physical', secondLabel: 'Emotional' },
    { pair: 'SV', first: 'S', second: 'V', title: 'Expression', firstLabel: 'Social', secondLabel: 'Private' },
    { pair: 'FC', first: 'F', second: 'C', title: 'Resolution', firstLabel: 'Forgiving', secondLabel: 'Critical' }
  ];

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

function shareResults() {
  const shareBtn = document.getElementById('shareBtn');
  shareBtn.disabled = true;
  shareBtn.textContent = 'Generating Image...';

  // Generate the share image
  generateShareImage().then(blob => {
    shareBtn.textContent = 'Share Results';
    shareBtn.disabled = false;

    const file = new File([blob], 'hcer-results.png', { type: 'image/png' });

    // Try to use native share with image
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: 'My HCER Personality Type',
        text: `I just discovered my HCER type: ${results.type} - ${typeDescriptions[results.type].name}!`,
        files: [file]
      }).catch(err => {
        console.log('Share failed:', err);
        downloadImage(blob);
      });
    } else {
      // Fallback: download the image
      downloadImage(blob);
    }
  }).catch(err => {
    console.error('Image generation failed:', err);
    shareBtn.textContent = 'Share Results';
    shareBtn.disabled = false;
    alert('Unable to generate share image. Please try again.');
  });
}

function generateShareImage() {
  return new Promise((resolve) => {
    const canvas = document.getElementById('shareCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = 800;
    canvas.height = 900;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#d2e0d3');
    gradient.addColorStop(1, '#97b3ae');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#2a2a2a';
    ctx.font = 'bold 32px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('HCER Relationship Typology', canvas.width / 2, 60);

    // Personality Type Badge
    ctx.fillStyle = '#97b3ae';
    ctx.fillRect(150, 100, 500, 180);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 96px -apple-system, sans-serif';
    ctx.fillText(results.type, canvas.width / 2, 215);

    // Type Name
    const typeData = typeDescriptions[results.type];
    ctx.fillStyle = '#2a2a2a';
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.fillText(typeData.name, canvas.width / 2, 330);

    // Get percentages
    const maxScores = { IR: 20, PE: 20, SV: 20, FC: 20 };
    const percentages = {
      I: Math.round(((results.rawScores.IR + maxScores.IR) / (2 * maxScores.IR)) * 100),
      R: Math.round(((-results.rawScores.IR + maxScores.IR) / (2 * maxScores.IR)) * 100),
      P: Math.round(((results.rawScores.PE + maxScores.PE) / (2 * maxScores.PE)) * 100),
      E: Math.round(((-results.rawScores.PE + maxScores.PE) / (2 * maxScores.PE)) * 100),
      S: Math.round(((results.rawScores.SV + maxScores.SV) / (2 * maxScores.SV)) * 100),
      V: Math.round(((-results.rawScores.SV + maxScores.SV) / (2 * maxScores.SV)) * 100),
      F: Math.round(((results.rawScores.FC + maxScores.FC) / (2 * maxScores.FC)) * 100),
      C: Math.round(((-results.rawScores.FC + maxScores.FC) / (2 * maxScores.FC)) * 100)
    };

    // Apply 51-49 fix
    if (percentages.I === 50) { percentages.I = 51; percentages.R = 49; }
    if (percentages.P === 50) { percentages.P = 51; percentages.E = 49; }
    if (percentages.S === 50) { percentages.S = 51; percentages.V = 49; }
    if (percentages.F === 50) { percentages.F = 51; percentages.C = 49; }

    // Dimension breakdowns
    const dimensions = [
      { first: 'I', second: 'R', firstLabel: 'Idealist', secondLabel: 'Realist', title: 'Hope' },
      { first: 'P', second: 'E', firstLabel: 'Physical', secondLabel: 'Emotional', title: 'Connection' },
      { first: 'S', second: 'V', firstLabel: 'Social', secondLabel: 'Private', title: 'Expression' },
      { first: 'F', second: 'C', firstLabel: 'Forgiving', secondLabel: 'Critical', title: 'Resolution' }
    ];

    let yPos = 400;
    dimensions.forEach((dim, index) => {
      const firstPercent = percentages[dim.first];
      const secondPercent = percentages[dim.second];
      const userLetter = results.type[index];

      // Dimension title
      ctx.fillStyle = '#2a2a2a';
      ctx.font = 'bold 24px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dim.title, canvas.width / 2, yPos);

      // Left label and percentage
      ctx.font = userLetter === dim.first ? 'bold 20px -apple-system, sans-serif' : '600 18px -apple-system, sans-serif';
      ctx.fillStyle = userLetter === dim.first ? '#2a2a2a' : '#999999';
      ctx.textAlign = 'left';
      ctx.fillText(`${dim.firstLabel} ${firstPercent}%`, 100, yPos + 50);

      // Right label and percentage
      ctx.font = userLetter === dim.second ? 'bold 20px -apple-system, sans-serif' : '600 18px -apple-system, sans-serif';
      ctx.fillStyle = userLetter === dim.second ? '#2a2a2a' : '#999999';
      ctx.textAlign = 'right';
      ctx.fillText(`${secondPercent}% ${dim.secondLabel}`, 700, yPos + 50);

      // Progress bar background
      ctx.fillStyle = '#f5f3ec';
      ctx.fillRect(100, yPos + 65, 600, 20);

      // Progress bar fill
      const fillFromLeft = firstPercent >= secondPercent;
      const barWidth = (fillFromLeft ? firstPercent : secondPercent) / 100 * 600;
      ctx.fillStyle = '#97b3ae';
      if (fillFromLeft) {
        ctx.fillRect(100, yPos + 65, barWidth, 20);
      } else {
        ctx.fillRect(700 - barWidth, yPos + 65, barWidth, 20);
      }

      yPos += 110;
    });

    // Footer
    ctx.fillStyle = '#2a2a2a';
    ctx.font = '18px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Discover your type at ' + window.location.origin, canvas.width / 2, canvas.height - 30);

    // Convert to blob
    canvas.toBlob(blob => resolve(blob), 'image/png');
  });
}

function downloadImage(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hcer-${results.type}-results.png`;
  link.click();
  URL.revokeObjectURL(url);
  alert('Results image downloaded! Share it on social media.');
}

