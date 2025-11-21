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
let isRandomMode = false;
let identityAnswer = null;

// Track metrics
const quizMetrics = {
  startTime: Date.now(),
  firstAnswerTime: null,
  userAgent: navigator.userAgent,
  screenWidth: window.screen.width,
  screenHeight: window.screen.height,
  referrer: document.referrer || 'direct',
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  language: navigator.language
};

// Render identity question
function renderIdentityQuestion() {
  const container = document.getElementById('questionsContainer');

  const questionDiv = document.createElement('div');
  questionDiv.className = 'question-item identity-question';

  const questionText = document.createElement('div');
  questionText.className = 'question-text';
  questionText.innerHTML = `<span class="question-number">#</span>What do you identify as?`;
  questionDiv.appendChild(questionText);

  const optionsDiv = document.createElement('div');
  optionsDiv.className = 'identity-options';

  const identityOptions = ['Man', 'Woman', 'Non-binary', 'Prefer not to say'];

  identityOptions.forEach(option => {
    const optionDiv = document.createElement('div');
    optionDiv.className = 'identity-option';

    const input = document.createElement('input');
    input.type = 'radio';
    input.name = 'identity';
    input.value = option;
    input.id = `identity_${option.replace(/\s+/g, '_')}`;

    input.addEventListener('change', () => {
      identityAnswer = option;
      questionDiv.classList.remove('question-unanswered');
    });

    const label = document.createElement('label');
    label.htmlFor = `identity_${option.replace(/\s+/g, '_')}`;
    label.textContent = option;

    optionDiv.appendChild(input);
    optionDiv.appendChild(label);
    optionsDiv.appendChild(optionDiv);
  });

  questionDiv.appendChild(optionsDiv);
  container.appendChild(questionDiv);
}

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
          // Track first answer time
          if (quizMetrics.firstAnswerTime === null) {
            quizMetrics.firstAnswerTime = Date.now();
          }
        }
        answers[index] = {
          value: parseInt(option.value),
          weights: question.weights
        };

        // Remove highlight if question was highlighted
        questionDiv.classList.remove('question-unanswered');

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

  // Render identity question last
  renderIdentityQuestion();
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

  // Check if all personality questions are answered FIRST
  if (answeredCount < questions.length) {
    // Find first unanswered question
    const allQuestions = document.querySelectorAll('.question-item');
    let firstUnanswered = null;

    questions.forEach((question, index) => {
      if (!answers[index]) {
        allQuestions[index].classList.add('question-unanswered');
        if (!firstUnanswered) {
          firstUnanswered = allQuestions[index];
        }
      }
    });

    // Scroll to first unanswered question
    if (firstUnanswered) {
      firstUnanswered.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return;
  }

  // Then check if identity question is answered
  if (!identityAnswer) {
    const identityQuestion = document.querySelector('.identity-question');
    identityQuestion.classList.add('question-unanswered');
    identityQuestion.scrollIntoView({ behavior: 'smooth', block: 'center' });
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

  // Send to Google Sheets only if NOT in random mode
  if (!isRandomMode) {
    // Prepare individual answers for submission
    const individualAnswers = [];
    questions.forEach((question, index) => {
      individualAnswers.push(answers[index] ? answers[index].value : 0);
    });

    // Calculate time metrics
    const endTime = Date.now();
    const totalTimeSeconds = Math.round((endTime - quizMetrics.startTime) / 1000);
    const timeToFirstAnswer = quizMetrics.firstAnswerTime
      ? Math.round((quizMetrics.firstAnswerTime - quizMetrics.startTime) / 1000)
      : null;

    // Create submission object with results, answers, and metrics
    const submission = {
      ...result,
      identity: identityAnswer,
      answers: individualAnswers,
      timestamp: new Date().toISOString(),
      metrics: {
        totalTimeSeconds,
        timeToFirstAnswer,
        userAgent: quizMetrics.userAgent,
        screenWidth: quizMetrics.screenWidth,
        screenHeight: quizMetrics.screenHeight,
        referrer: quizMetrics.referrer,
        timezone: quizMetrics.timezone,
        language: quizMetrics.language
      }
    };

    fetch('https://script.google.com/macros/s/AKfycbwAMmmqwUPPCjTaAvez4Td0XaPxJSsvz5Sb2U_qQSRJHaN5GB1k7sCsx1yGIIzvHnLG1g/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    }).catch(err => {
      console.log('Sheet submission error (this is normal with no-cors):', err);
    }).finally(() => {
      // Navigate to results page after attempt
      setTimeout(() => {
        window.location.href = 'results.html';
      }, 500); // Small delay to show loading state
    });
  } else {
    // Skip Google Sheets in random mode
    setTimeout(() => {
      window.location.href = 'results.html';
    }, 500);
  }
});

// Initialize quiz
renderQuestions();

// Toggle random mode
function toggleRandomMode() {
  const btn = document.getElementById('autofillBtn');

  if (isRandomMode) {
    // Turn OFF: Clear all answers
    // Clear identity question
    const identityRadios = document.querySelectorAll(`input[name="identity"]`);
    identityRadios.forEach(radio => {
      radio.checked = false;
    });
    identityAnswer = null;

    questions.forEach((question, index) => {
      const radioButtons = document.querySelectorAll(`input[name="q${index}"]`);
      radioButtons.forEach(radio => {
        radio.checked = false;
      });
    });

    answers = {};
    answeredCount = 0;
    isRandomMode = false;
    btn.classList.remove('autofill-active');
    btn.textContent = '🎲';
    updateProgress();

    // Remove any unanswered highlights
    const allQuestions = document.querySelectorAll('.question-item');
    allQuestions.forEach(q => q.classList.remove('question-unanswered'));

  } else {
    // Turn ON: Fill quiz randomly
    // Fill identity question randomly
    const identityOptions = ['Man', 'Woman', 'Non-binary', 'Prefer not to say'];
    const randomIdentity = identityOptions[Math.floor(Math.random() * identityOptions.length)];
    const identityRadio = document.getElementById(`identity_${randomIdentity.replace(/\s+/g, '_')}`);
    if (identityRadio) {
      identityRadio.checked = true;
      identityAnswer = randomIdentity;
    }

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

    isRandomMode = true;
    btn.classList.add('autofill-active');
    btn.textContent = '🎲';
    updateProgress();

    // Remove any unanswered highlights
    const allQuestions = document.querySelectorAll('.question-item');
    allQuestions.forEach(q => q.classList.remove('question-unanswered'));

    // Scroll to bottom to show all filled answers including identity question
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }
}

// Keep old function name for compatibility
function autofillQuiz() {
  toggleRandomMode();
}
