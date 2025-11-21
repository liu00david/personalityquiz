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

// Global variables for sharing
let currentType, currentPercentages, currentTypeData, currentDimensions;

if (!results) {
  window.location.href = 'index.html';
} else {
  displayResults(results);
}

function getTraitColors() {
  const styles = getComputedStyle(document.documentElement);
  return {
    I: styles.getPropertyValue('--trait-i').trim(),
    R: styles.getPropertyValue('--trait-r').trim(),
    P: styles.getPropertyValue('--trait-p').trim(),
    E: styles.getPropertyValue('--trait-e').trim(),
    S: styles.getPropertyValue('--trait-s').trim(),
    V: styles.getPropertyValue('--trait-v').trim(),
    F: styles.getPropertyValue('--trait-f').trim(),
    C: styles.getPropertyValue('--trait-c').trim()
  };
}

// Pixel Avatar Generator
function generatePixelAvatar(type, percentages, size) {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const traitColors = getTraitColors();

  const gridSize = 8; // 8x8 pixel grid
  const pixelSize = size / gridSize;
  const totalPixels = gridSize * gridSize;

  // Calculate number of pixels for each trait based on percentages
  const traitPixelCounts = {};
  let assignedPixels = 0;

  // Only use the 4 dominant traits from the type
  const dominantTraits = type.split('');
  const traitData = dominantTraits.map(trait => ({
    trait,
    percentage: percentages[trait],
    pixels: Math.floor((percentages[trait] / 100) * totalPixels)
  })).sort((a, b) => b.percentage - a.percentage);

  // Assign pixels based on percentage
  traitData.forEach(data => {
    traitPixelCounts[data.trait] = data.pixels;
    assignedPixels += data.pixels;
  });

  // Distribute remaining pixels to highest percentage traits
  let remaining = totalPixels - assignedPixels;
  for (let i = 0; i < traitData.length && remaining > 0; i++) {
    traitPixelCounts[traitData[i].trait]++;
    remaining--;
  }

  // Create array of pixels with their assigned colors
  const pixelColors = [];
  Object.entries(traitPixelCounts).forEach(([trait, count]) => {
    for (let i = 0; i < count; i++) {
      pixelColors.push(traitColors[trait]);
    }
  });

  // Shuffle pixels using seeded random for consistency
  const seed = type.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  let randomSeed = seed;
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280;
    return randomSeed / 233280;
  };

  for (let i = pixelColors.length - 1; i > 0; i--) {
    const j = Math.floor(seededRandom() * (i + 1));
    [pixelColors[i], pixelColors[j]] = [pixelColors[j], pixelColors[i]];
  }

  // Fill the grid with faint borders between pixels
  let colorIndex = 0;
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      ctx.fillStyle = pixelColors[colorIndex];
      ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

      // Add very faint border
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);

      colorIndex++;
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

  // Store for sharing
  currentType = type;
  currentTypeData = typeData;

  // Calculate percentages first (needed for avatar generation)
  // Calculate max possible scores for each dimension based on question weights
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

  // Calculate percentages (0-100 scale for each side)
  // Round one side, then calculate the other as 100 - first to ensure they sum to exactly 100
  const I = Math.round(((rawScores.IR + maxScores.IR) / (2 * maxScores.IR)) * 100);
  const P = Math.round(((rawScores.PE + maxScores.PE) / (2 * maxScores.PE)) * 100);
  const S = Math.round(((rawScores.SV + maxScores.SV) / (2 * maxScores.SV)) * 100);
  const F = Math.round(((rawScores.FC + maxScores.FC) / (2 * maxScores.FC)) * 100);

  const percentages = {
    I: I,
    R: 100 - I,
    P: P,
    E: 100 - P,
    S: S,
    V: 100 - S,
    F: F,
    C: 100 - F
  };

  // Store for sharing
  currentPercentages = percentages;

  // Generate and set pixel avatar locally
  const avatarCanvas = generatePixelAvatar(type, percentages, 150);
  const avatarImg = document.getElementById('typeAvatar');
  avatarImg.src = avatarCanvas.toDataURL();

  const letters = type.split('');

  // Analyze strength of each dimension
  const dimensions = [
    { pair: 'IR', first: 'I', second: 'R', title: 'Hope', firstLabel: 'Idealist', secondLabel: 'Realist' },
    { pair: 'PE', first: 'P', second: 'E', title: 'Connection', firstLabel: 'Physical', secondLabel: 'Emotional' },
    { pair: 'SV', first: 'S', second: 'V', title: 'Expression', firstLabel: 'Social', secondLabel: 'Private' },
    { pair: 'FC', first: 'F', second: 'C', title: 'Resolution', firstLabel: 'Forgiving', secondLabel: 'Critical' }
  ];

  // Store for sharing
  currentDimensions = dimensions;

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
  let insightsHTML = '';

  if (strongTraits.length > 0) {
    const traitList = strongTraits.map(t => `${t.label} (${t.percent}%)`).join(', ');
    insightsHTML += `<p>Your strongest ${strongTraits.length === 1 ? 'trait is' : 'traits are'} ${traitList}. ${strongTraits.length === 1 ? 'This dimension shapes' : 'These dimensions shape'} your relationship style, and you may find the most compatibility with someone sharing this.</p>`;
  }

  if (balancedTraits.length > 0) {
    const balancedList = balancedTraits.map(t => `${t.title} (${t.firstPercent}% ${t.first}, ${t.secondPercent}% ${t.second})`).join(', ');
    insightsHTML += `<p>You show balance in ${balancedList}. This indicates you can shift between both tendencies, responding to relationship needs.</p>`;
  }

  if (insightsHTML === '' || balancedTraits.length == 4) {
    insightsHTML = '<p>Your results are balanced across all dimensions, giving you a flexible relationship style. For a clearer type, try retaking the quiz with more decisive answers.</p>';
  }

  document.getElementById('insightsText').innerHTML = insightsHTML;

  const breakdownContainer = document.getElementById('dimensionsBreakdown');
  breakdownContainer.innerHTML = '';

  // Get colors from CSS variables
  const styles = getComputedStyle(document.documentElement);
  const dimensionColors = {
    'Hope': styles.getPropertyValue('--dimension-hope').trim(),
    'Connection': styles.getPropertyValue('--dimension-connection').trim(),
    'Expression': styles.getPropertyValue('--dimension-expression').trim(),
    'Resolution': styles.getPropertyValue('--dimension-resolution').trim()
  };
  const traitColors = getTraitColors();

  dimensions.forEach((dim, index) => {
    const firstPercent = percentages[dim.first];
    const secondPercent = percentages[dim.second];
    const userLetter = letters[index];

    // Determine fill direction and width based on user's actual letter
    const fillFromLeft = userLetter === dim.first;
    const barWidth = fillFromLeft ? firstPercent : secondPercent;
    const dominantTrait = userLetter;
    const barColor = traitColors[dominantTrait] || dimensionColors[dim.title];

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
            <div class="bar-fill-single ${fillFromLeft ? 'fill-left' : 'fill-right'}" style="width: ${barWidth}%; background: ${barColor};"></div>
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

// Share Results Function
function shareResults() {
  const canvas = document.createElement('canvas');
  const width = 800;
  const height = 1000;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  // Color variables
  const colors = {
    sage: '#97b3ae',        // Background
    mint: '#d2e0d3',        // Card background
    sageBlue: '#3a6275',    // Type badge and bar fill
    white: '#ffffff',       // Bar track
    textPrimary: '#2a2a2a', // Main text
    textMuted: '#666666'    // Footer text
  };

  // Background - sage green
  ctx.fillStyle = colors.sage;
  ctx.fillRect(0, 0, width, height);

  // Add rounded rectangle background for content - light mint green
  ctx.fillStyle = colors.mint;
  roundRect(ctx, 40, 40, width - 80, height - 80, 20);

  // Draw pixel avatar
  const avatarSize = 200;
  const avatarCanvas = generatePixelAvatar(currentType, currentPercentages, avatarSize);
  const avatarX = (width - avatarSize) / 2;
  const avatarY = 100;

  // Draw avatar with circular mask
  ctx.save();
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.closePath();
  ctx.clip();
  ctx.drawImage(avatarCanvas, avatarX, avatarY, avatarSize, avatarSize);
  ctx.restore();

  // Draw white circle border around avatar
  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(avatarX + avatarSize / 2, avatarY + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2);
  ctx.stroke();

  // Draw personality type badge
  ctx.fillStyle = colors.sageBlue;
  ctx.font = 'bold 64px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(currentType, width / 2, avatarY + avatarSize + 90);

  // Draw personality name
  ctx.fillStyle = colors.textPrimary;
  ctx.font = 'bold 36px -apple-system, sans-serif';
  ctx.fillText(currentTypeData.name, width / 2, avatarY + avatarSize + 140);

  // Draw dimensions (moved lower, skinnier bars, shorter width)
  const dimensionsY = avatarY + avatarSize + 230;
  const barWidth = 500;
  const barHeight = 20;
  const barX = (width - barWidth) / 2;
  const spacing = 95;

  const letters = currentType.split('');

  // Dimension colors for bars
  const traitColors = getTraitColors();

  currentDimensions.forEach((dim, index) => {
    const y = dimensionsY + (index * spacing);
    const firstPercent = currentPercentages[dim.first];
    const secondPercent = currentPercentages[dim.second];
    const userLetter = letters[index];
    const dominantTrait = firstPercent >= secondPercent ? dim.first : dim.second;
    const barColor = traitColors[dominantTrait];

    // Draw dimension title
    ctx.fillStyle = colors.textPrimary;
    ctx.font = 'bold 22px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(dim.title, width / 2, y - 16);

    // Draw labels and percentages above the bar
    ctx.font = 'bold 20px -apple-system, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillStyle = userLetter === dim.first ? colors.textPrimary : '#999999';
    ctx.fillText(`${dim.firstLabel}: ${firstPercent}%`, barX, y - 5);

    ctx.textAlign = 'right';
    ctx.fillStyle = userLetter === dim.second ? colors.textPrimary : '#999999';
    ctx.fillText(`${dim.secondLabel}: ${secondPercent}%`, barX + barWidth, y - 5);

    // Draw percentage bar track (white)
    ctx.fillStyle = colors.white;
    roundRect(ctx, barX, y + 5, barWidth, barHeight, 12);

    // Draw percentage bar fill (with curved edges and dimension color)
    const fillFromLeft = firstPercent >= secondPercent;
    const fillPercent = fillFromLeft ? firstPercent : secondPercent;
    const fillWidth = (barWidth * fillPercent) / 100;

    ctx.fillStyle = barColor;
    if (fillFromLeft) {
      roundRectLeftOnly(ctx, barX, y + 5, fillWidth, barHeight, 12);
    } else {
      roundRectRightOnly(ctx, barX + barWidth - fillWidth, y + 5, fillWidth, barHeight, 12);
    }
  });

  // Add footer text (two lines)
  ctx.fillStyle = colors.textMuted;
  ctx.font = '16px -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('HCER Relationship Typology', width / 2, height - 80);

  ctx.font = '14px -apple-system, sans-serif';
  ctx.fillText('https://liu00david.github.io/personalityquiz', width / 2, height - 60);

  // Share image
  canvas.toBlob(async (blob) => {
    const file = new File([blob], `HCER-${currentType}-Results.png`, { type: 'image/png' });

    // Try to use native share if available
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: `My personality: ${currentType}, ${currentTypeData.name}`,
          text: `Discover your HCER Relationship Typology at https://liu00david.github.io/personalityquiz`
        });
      } catch (err) {
        // User cancelled or share failed, fallback to download
        if (err.name !== 'AbortError') {
          downloadImage(blob);
        }
      }
    } else {
      // Fallback to download if Web Share API not supported
      downloadImage(blob);
    }
  });
}

// Helper function to download image
function downloadImage(blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `HCER-${currentType}-Results.png`;
  a.click();
  URL.revokeObjectURL(url);
}

// Helper function to draw rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function roundRectLeftOnly(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

function roundRectRightOnly(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}
