# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static personality quiz website for the IRSP (Idealist/Realist, Physical/Emotional, Social/Private, Forgiving/Critical) relationship typology framework. The quiz uses vanilla HTML/CSS/JavaScript with no build process and is designed for deployment on GitHub Pages.

## Development Commands

**Local Testing:**
```bash
# Simple local server (Python)
python -m http.server 8000

# Alternative (Node.js)
npx serve
```

Then visit `http://localhost:8000`

**Deployment:**
- Push to GitHub main branch
- GitHub Pages automatically serves from the main branch
- No build or compile step required

## Architecture

### Core Files

1. **index.html** - Main quiz interface
   - Single-page form with all 50 questions
   - Progress tracking bar
   - Submits to results page via sessionStorage

2. **results.html** - Results display page
   - Reads personality type from sessionStorage
   - Shows 4-letter type, archetype name, and detailed breakdowns
   - Share functionality for social media

3. **questions.js** - Question bank and data
   - Array of 50 questions distributed across 4 dimensions (13, 13, 12, 12)
   - Each question has: `text`, `dimension` (IR/PE/SV/FC), `direction` (which trait)
   - Questions are scenario-based and balanced to avoid right/wrong framing
   - `typeDescriptions` object with all 16 personality types
   - Backup of original questions saved in `questions-backup.js`

4. **quiz.js** - Quiz logic and scoring
   - Renders questions dynamically
   - Tracks answers in local state
   - Scoring algorithm: Likert scale (-2 to +2) summed per dimension
   - Positive score = first letter, negative = second letter (e.g., IR: positive→I, negative→R)

5. **results.js** - Results page logic
   - Retrieves results from sessionStorage
   - Displays personality type and dimension breakdowns
   - Implements share/copy functionality

6. **styles.css** - All styling
   - Modern gradient-based design (purple gradient: #667eea to #764ba2)
   - Fully responsive with mobile breakpoints
   - Custom radio button styling for Likert scale

### Scoring Algorithm

The quiz uses a 5-point Likert scale mapped to scores:
- Strongly Disagree: -2
- Disagree: -1
- Neutral: 0
- Agree: 1
- Strongly Agree: 2

For each dimension (IR, PE, SV, FC):
1. Each question has a `direction` indicating which trait agreement supports
2. Scores accumulate based on direction (add if matches direction, subtract otherwise)
3. Final dimension score > 0 = first letter, ≤ 0 = second letter
4. Combine 4 letters to get personality type (e.g., IPSF, REVC)

### Question Structure

Each question in `questions.js` follows this format:
```javascript
{
  text: "Question statement",
  dimension: "IR",  // IR, PE, SV, or FC
  direction: "I"    // Which trait agreement indicates
}
```

Dimensions:
- **IR**: Idealist (I) vs Realist (R) - Hope dimension
- **PE**: Physical (P) vs Emotional (E) - Connection dimension
- **SV**: Social (S) vs Private (V) - Expression dimension
- **FC**: Forgiving (F) vs Critical (C) - Conflict dimension

## Key Design Decisions

1. **No Framework**: Pure vanilla JS for simplicity and GitHub Pages compatibility
2. **SessionStorage**: Results passed between pages without backend
3. **All Questions on One Page**: User sees progress and can review answers
4. **Balanced Questions**: 13 questions per dimension for equal weighting
5. **Gradient Theme**: Purple gradient (#667eea to #764ba2) throughout for modern feel

## Common Tasks

### Adding New Questions
1. Edit `questions.js`
2. Add question object to `questions` array with text, dimension, and direction
3. Ensure dimensions remain balanced (equal questions per dimension for fairness)

### Modifying Personality Descriptions
1. Edit `typeDescriptions` object in `questions.js`
2. Each type needs `name` and `description` properties
3. Also update `dimensionInfo` in `results.js` for dimension-specific descriptions

### Changing Visual Theme
1. Edit gradient colors in `styles.css`
2. Main gradient in `body` selector
3. Component gradients throughout (search for #667eea and #764ba2)

### Testing Scoring Algorithm
1. Fill out quiz with known answers
2. Check console in `quiz.js` if debugging needed
3. Verify sessionStorage contains correct scores
4. Check results page displays expected personality type

## Important Files Referenced

- `PERSONALITY.md` - Complete framework documentation with all 16 types
- `README.md` - User-facing documentation and setup instructions
