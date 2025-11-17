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

// Store pre-generated share image
let preGeneratedShareBlob = null;

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

  // Pre-generate share image for faster sharing
  generateShareImage().then(blob => {
    preGeneratedShareBlob = blob;
  }).catch(err => {
    console.error('Pre-generation failed:', err);
  });
}

function shareResults() {
  const shareBtn = document.getElementById('shareBtn');

  // Use pre-generated blob if available
  if (preGeneratedShareBlob) {
    const file = new File([preGeneratedShareBlob], 'hcer-results.png', { type: 'image/png' });

    // Try to use native share with image
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: 'My HCER Personality Type',
        text: `I just discovered my HCER type: ${results.type} - ${typeDescriptions[results.type].name}!`,
        files: [file]
      }).catch(err => {
        console.log('Share failed:', err);
        downloadImage(preGeneratedShareBlob);
      });
    } else {
      // Fallback: download the image
      downloadImage(preGeneratedShareBlob);
    }
  } else {
    // Fallback: generate on demand if pre-generation failed
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

    // Personality Type Badge - Rounded Box
    const boxX = 200;
    const boxY = 100;
    const boxWidth = 400;
    const boxHeight = 160;
    const borderRadius = 20;

    ctx.fillStyle = '#305669';
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, borderRadius);
    ctx.fill();

    // Center text in box
    ctx.fillStyle = 'white';
    ctx.font = 'bold 96px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(results.type, canvas.width / 2, boxY + boxHeight / 2);

    // Type Name
    const typeData = typeDescriptions[results.type];
    ctx.fillStyle = '#2a2a2a';
    ctx.font = 'bold 36px -apple-system, sans-serif';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(`"${typeData.name}"`, canvas.width / 2, 300);

    // Calculate max scores dynamically
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

    // Dimension breakdowns
    const dimensions = [
      { first: 'I', second: 'R', firstLabel: 'Idealist', secondLabel: 'Realist', title: 'Hope' },
      { first: 'P', second: 'E', firstLabel: 'Physical', secondLabel: 'Emotional', title: 'Connection' },
      { first: 'S', second: 'V', firstLabel: 'Social', secondLabel: 'Private', title: 'Expression' },
      { first: 'F', second: 'C', firstLabel: 'Forgiving', secondLabel: 'Critical', title: 'Resolution' }
    ];

    let yPos = 340;
    dimensions.forEach((dim, index) => {
      const firstPercent = percentages[dim.first];
      const secondPercent = percentages[dim.second];
      const userLetter = results.type[index];

      // Dimension title
      ctx.fillStyle = '#2a2a2a';
      ctx.font = 'bold 22px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'alphabetic';
      ctx.fillText(dim.title, canvas.width / 2, yPos);

      // Left label and percentage
      ctx.font = userLetter === dim.first ? 'bold 18px -apple-system, sans-serif' : '600 16px -apple-system, sans-serif';
      ctx.fillStyle = userLetter === dim.first ? '#2a2a2a' : '#999999';
      ctx.textAlign = 'left';
      ctx.fillText(`${dim.firstLabel} ${firstPercent}%`, 100, yPos + 25);

      // Right label and percentage
      ctx.font = userLetter === dim.second ? 'bold 18px -apple-system, sans-serif' : '600 16px -apple-system, sans-serif';
      ctx.fillStyle = userLetter === dim.second ? '#2a2a2a' : '#999999';
      ctx.textAlign = 'right';
      ctx.fillText(`${secondPercent}% ${dim.secondLabel}`, 700, yPos + 25);

      // Progress bar background with rounded corners
      const barRadius = 10;
      ctx.fillStyle = '#f5f3ec';
      ctx.beginPath();
      ctx.roundRect(100, yPos + 35, 600, 20, barRadius);
      ctx.fill();

      // Progress bar fill with rounded corners
      const fillFromLeft = firstPercent >= secondPercent;
      const barWidth = (fillFromLeft ? firstPercent : secondPercent) / 100 * 600;
      ctx.fillStyle = '#305669';
      ctx.beginPath();
      if (fillFromLeft) {
        ctx.roundRect(100, yPos + 35, barWidth, 20, barRadius);
      } else {
        ctx.roundRect(700 - barWidth, yPos + 35, barWidth, 20, barRadius);
      }
      ctx.fill();

      yPos += 100;
    });

    // Footer
    ctx.fillStyle = '#2a2a2a';
    ctx.font = '16px -apple-system, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Discover your type at https://liu00david.github.io/personalityquiz', canvas.width / 2, canvas.height - 30);

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
}

