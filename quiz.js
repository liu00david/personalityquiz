// Quiz functionality and scoring algorithm

const likertOptions = [
  { value: -2, label: "Strong Disagree" },
  { value: -1, label: "Disagree" },
  { value: 1, label: "Agree" },
  { value: 2, label: "Strong Agree" }
];

// Track answers
let answers = {};
let answeredCount = 0;

// Render all questions
function renderQuestions() {
  const container = document.getElementById('questionsContainer');

  questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-item';

    const questionText = document.createElement('div');
    questionText.className = 'question-text';
    questionText.innerHTML = `<span class="question-number">${index + 1}</span>${question.text}`;
    questionDiv.appendChild(questionText);

    const likertDiv = document.createElement('div');
    likertDiv.className = 'likert-scale';

    likertOptions.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'likert-option';

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `q${index}`;
      input.value = option.value;
      input.id = `q${index}_${option.value}`;

      input.addEventListener('change', () => {
        if (!answers[index]) {
          answeredCount++;
        }
        answers[index] = {
          value: parseInt(option.value),
          weights: question.weights
        };
        updateProgress();
      });

      const label = document.createElement('label');
      label.htmlFor = `q${index}_${option.value}`;
      label.textContent = option.label;

      optionDiv.appendChild(input);
      optionDiv.appendChild(label);
      likertDiv.appendChild(optionDiv);
    });

    questionDiv.appendChild(likertDiv);
    container.appendChild(questionDiv);
  });
}

// Update progress bar
function updateProgress() {
  const percentage = (answeredCount / questions.length) * 100;
  document.getElementById('progressBar').style.width = percentage + '%';
  document.getElementById('progressPercentage').textContent = Math.round(percentage) + '%';
}

// Calculate personality type
function calculatePersonality() {
  const scores = {
    IR: 0,  // Idealist (positive) vs Realist (negative)
    PE: 0,  // Physical (positive) vs Emotional (negative)
    SV: 0,  // Social (positive) vs Private (negative)
    FC: 0   // Forgiving (positive) vs Critical (negative)
  };

  // Sum up scores using matrix weights
  // weights format: [IR, PE, SV, FC]
  // Positive = left trait (I, P, S, F), Negative = right trait (R, E, V, C)
  Object.values(answers).forEach(answer => {
    const { value, weights } = answer;

    scores.IR += value * weights[0];
    scores.PE += value * weights[1];
    scores.SV += value * weights[2];
    scores.FC += value * weights[3];
  });

  // Determine personality type based on scores (>= 0 leans left on ties)
  const type =
    (scores.IR >= 0 ? 'I' : 'R') +
    (scores.PE >= 0 ? 'P' : 'E') +
    (scores.SV >= 0 ? 'S' : 'V') +
    (scores.FC >= 0 ? 'F' : 'C');

  return {
    type,
    scores,
    rawScores: scores
  };
}

// Handle form submission
document.getElementById('quizForm').addEventListener('submit', (e) => {
  e.preventDefault();

  // Check if all questions are answered
  if (answeredCount < questions.length) {
    alert(`Please answer all questions. You have ${questions.length - answeredCount} questions remaining.`);
    return;
  }

  // Disable submit button to prevent spam
  const submitBtn = document.querySelector('.submit-btn');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Calculating Results...';
  submitBtn.style.opacity = '0.6';
  submitBtn.style.cursor = 'not-allowed';

  // Calculate results
  const result = calculatePersonality();

  // Store results in sessionStorage
  sessionStorage.setItem('quizResults', JSON.stringify(result));

  // Send to Google Sheets
  fetch('https://script.google.com/macros/s/AKfycbxba14m8jihcfD2E08HpTerf7akF4ILORyHa8cRJEYL9vDvNCu8rfYzCbq1D0qGOXnphg/exec', {
    method: 'POST',
    mode: 'no-cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(result)
  }).catch(err => {
    console.log('Sheet submission error (this is normal with no-cors):', err);
  }).finally(() => {
    // Navigate to results page after attempt
    setTimeout(() => {
      window.location.href = 'results.html';
    }, 500); // Small delay to show loading state
  });
});

// Initialize quiz
renderQuestions();

// Autofill function for testing
function autofillQuiz() {
  questions.forEach((question, index) => {
    // Randomly select a value from the available options (no neutral)
    const options = [-2, -1, 1, 2];
    const randomValue = options[Math.floor(Math.random() * options.length)];

    // Find and check the corresponding radio button
    const radioBtn = document.getElementById(`q${index}_${randomValue}`);
    if (radioBtn) {
      radioBtn.checked = true;

      // Update answers object
      if (!answers[index]) {
        answeredCount++;
      }
      answers[index] = {
        value: randomValue,
        weights: question.weights
      };
    }
  });

  updateProgress();
}
