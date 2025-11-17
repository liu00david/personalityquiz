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

  // Set avatar using Boring Avatars with trait-specific colors
  const traitColors = {
    I: 'ffc6ff', // Idealist
    R: 'caffbf', // Realist
    P: 'ffadad', // Physical
    E: 'bdb2ff', // Emotional
    S: 'ffd6a5', // Social
    V: '9bf6ff', // Private
    F: 'a0c4ff', // Forgiving
    C: 'fdffb6'  // Critical
  };

  const colors = type.split('').map(letter => traitColors[letter]).join(',');
  const avatarUrl = `https://hostedboringavatars.vercel.app/api/pixel?name=${type}&size=150&colors=${colors}`;
  document.getElementById('typeAvatar').src = avatarUrl;

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
    } else if (dominantPercent <= 54) {
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
    insightsText += `Your strongest ${strongTraits.length === 1 ? 'trait is' : 'traits are'} ${traitList}. ${strongTraits.length === 1 ? 'This dimension' : 'These dimensions'} strongly define what you find attractive, and matters most in a relationship. `;
  }

  if (balancedTraits.length > 0) {
    const balancedList = balancedTraits.map(t => `${t.title} (${t.firstPercent}% ${t.first}, ${t.secondPercent}% ${t.second})`).join(', ');
    insightsText += `You show balance in: ${balancedList}. This means you can adapt between both styles depending on the situation and partner.`;
  }

  if (insightsText === '') {
    insightsText = 'Your personality shows moderate tendencies across all dimensions, giving you flexibility in how you express yourself in relationships.';
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

  // Populate share card (don't pre-generate, just prepare the content)
  populateShareCard();
}

async function populateShareCard() {
  // Set avatar - fetch and convert to data URL to avoid CORS issues
  const traitColors = {
    I: 'ffc6ff', R: 'caffbf', P: 'ffadad', E: 'bdb2ff',
    S: 'ffd6a5', V: '9bf6ff', F: 'a0c4ff', C: 'fdffb6'
  };
  const colors = results.type.split('').map(letter => traitColors[letter]).join(',');
  const avatarUrl = `https://hostedboringavatars.vercel.app/api/pixel?name=${results.type}&size=120&colors=${colors}`;

  try {
    const response = await fetch(avatarUrl);
    const svgText = await response.text();
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const reader = new FileReader();
    reader.onload = function() {
      document.getElementById('shareAvatar').src = reader.result;
    };
    reader.readAsDataURL(svgBlob);
  } catch (err) {
    console.warn('Failed to load avatar for share card:', err);
  }

  // Set type badge and name
  document.getElementById('shareTypeBadge').textContent = results.type;
  const typeData = typeDescriptions[results.type];
  document.getElementById('shareTypeName').textContent = `"${typeData.name}"`;

  // Calculate percentages
  const maxScores = { IR: 0, PE: 0, SV: 0, FC: 0 };
  questions.forEach(q => {
    maxScores.IR += Math.abs(q.weights[0]) * 2;
    maxScores.PE += Math.abs(q.weights[1]) * 2;
    maxScores.SV += Math.abs(q.weights[2]) * 2;
    maxScores.FC += Math.abs(q.weights[3]) * 2;
  });

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

  // Build dimensions
  const dimensions = [
    { first: 'I', second: 'R', firstLabel: 'Idealist', secondLabel: 'Realist', title: 'Hope' },
    { first: 'P', second: 'E', firstLabel: 'Physical', secondLabel: 'Emotional', title: 'Connection' },
    { first: 'S', second: 'V', firstLabel: 'Social', secondLabel: 'Private', title: 'Expression' },
    { first: 'F', second: 'C', firstLabel: 'Forgiving', secondLabel: 'Critical', title: 'Resolution' }
  ];

  const shareDimensionsContainer = document.getElementById('shareDimensions');
  shareDimensionsContainer.innerHTML = '';

  dimensions.forEach((dim, index) => {
    const firstPercent = percentages[dim.first];
    const secondPercent = percentages[dim.second];
    const userLetter = results.type[index];
    const fillFromLeft = firstPercent >= secondPercent;
    const barWidth = fillFromLeft ? firstPercent : secondPercent;

    const dimHTML = `
      <div style="margin-bottom: 30px;">
        <h4 style="text-align: center; color: #2a2a2a; font-size: 22px; font-weight: bold; margin-bottom: 10px;">${dim.title}</h4>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="font-size: 16px; font-weight: ${userLetter === dim.first ? 'bold' : '600'}; color: ${userLetter === dim.first ? '#2a2a2a' : '#999999'};">${dim.firstLabel} ${firstPercent}%</span>
          <span style="font-size: 16px; font-weight: ${userLetter === dim.second ? 'bold' : '600'}; color: ${userLetter === dim.second ? '#2a2a2a' : '#999999'};">${secondPercent}% ${dim.secondLabel}</span>
        </div>
        <div style="background: #f5f3ec; height: 20px; border-radius: 10px; position: relative; overflow: hidden;">
          <div style="background: #305669; height: 100%; width: ${barWidth}%; border-radius: 10px; ${fillFromLeft ? 'float: left;' : 'float: right;'}"></div>
        </div>
      </div>
    `;
    shareDimensionsContainer.innerHTML += dimHTML;
  });
}

function shareResults() {
  const shareBtn = document.getElementById('shareBtn');
  shareBtn.disabled = true;
  shareBtn.textContent = 'Generating Image...';

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
  return new Promise(async (resolve, reject) => {
    const shareCard = document.getElementById('shareCard');

    // Temporarily show the card for capturing
    shareCard.style.display = 'block';

    // Wait for avatar to load (longer timeout since it's fetching and converting)
    await new Promise(r => setTimeout(r, 1500));

    try {
      // Use html2canvas to capture the div
      const canvas = await html2canvas(shareCard, {
        backgroundColor: null,
        scale: 2, // Higher quality
        useCORS: true, // Allow cross-origin images
        allowTaint: true
      });

      // Hide the card again
      shareCard.style.display = 'none';

      // Convert canvas to blob
      canvas.toBlob(blob => resolve(blob), 'image/png');
    } catch (err) {
      shareCard.style.display = 'none';
      reject(err);
    }
  });
}

function downloadImage(blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hcer-${results.type}-results.png`;
  link.click();
  URL.revokeObjectURL(url);
}

