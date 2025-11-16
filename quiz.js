// Quiz functionality and scoring algorithm

const likertOptions = [
  { value: -2, label: "Strong Disagree" },
  { value: -1, label: "Disagree" },
  { value: 0, label: "Neutral" },
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
          dimension: question.dimension,
          direction: question.direction
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

  // Sum up scores for each dimension
  Object.values(answers).forEach(answer => {
    const { value, dimension, direction } = answer;

    // Determine if we should add or subtract based on direction
    if (dimension === 'IR') {
      scores.IR += direction === 'I' ? value : -value;
    } else if (dimension === 'PE') {
      scores.PE += direction === 'P' ? value : -value;
    } else if (dimension === 'SV') {
      scores.SV += direction === 'S' ? value : -value;
    } else if (dimension === 'FC') {
      scores.FC += direction === 'F' ? value : -value;
    }
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

  // Calculate results
  const result = calculatePersonality();

  // Store results in sessionStorage
  sessionStorage.setItem('quizResults', JSON.stringify(result));

  // Navigate to results page
  window.location.href = 'results.html';
});

// Initialize quiz
renderQuestions();

// Autofill function for testing
function autofillQuiz() {
  questions.forEach((question, index) => {
    // Randomly select a value from -2 to 2
    const randomValue = Math.floor(Math.random() * 5) - 2; // -2, -1, 0, 1, 2

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
        dimension: question.dimension,
        direction: question.direction
      };
    }
  });

  updateProgress();
}
