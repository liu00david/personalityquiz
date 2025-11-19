# HCER Relationship Typology Quiz

A modern, interactive personality quiz that helps users discover their 4-letter romantic personality type based on the HCER framework (Hope, Connection, Expression, Resolution).

## Live Demo

Visit the quiz at: [Your GitHub Pages URL will be here]

## Features

- 50 carefully crafted questions across 4 relationship dimensions
- Modern, colorful, gradient-based UI
- 5-point Likert scale for nuanced responses
- Instant personality type calculation
- Detailed results page with dimension breakdowns
- Mobile-responsive design
- Share functionality for results

## The HCER Framework

The quiz measures four key dimensions of romantic behavior:

1. **H - Hope Dimension**: Idealist vs Realist
2. **C - Connection Dimension**: Physical vs Emotional
3. **E - Expression Dimension**: Social vs Private
4. **R - Resolution Dimension**: Forgiving vs Critical

Results in one of 16 personality types (e.g., IPSF - The Glow, REVC - The Strategist).

## GitHub Pages Setup

1. Push this repository to GitHub
2. Go to repository Settings → Pages
3. Under "Source", select the main branch
4. Click Save
5. Your site will be live at `https://[username].github.io/personality-quiz/`

## Project Structure

```
personality-quiz/
├── index.html          # Main quiz page
├── results.html        # Results display page
├── styles.css          # All styling and responsive design
├── questions.js        # Question bank and type descriptions
├── quiz.js             # Quiz logic and scoring algorithm
├── results.js          # Results page logic
├── PERSONALITY.md      # Framework documentation
└── README.md           # This file
```

## Local Development

Simply open `index.html` in a web browser. No build process or server required!

For a better development experience with live reload:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit `http://localhost:8000`

## Customization

### Changing Colors
All colors are centralized in `colors.css` using CSS custom properties. Edit the hex values there to update the entire site's color scheme.

### Adding/Modifying Questions
Edit `questions.js` to add or modify questions. Each question requires:
- `text`: The question statement
- `dimension`: One of "IR", "PE", "SV", "FC"
- `direction`: Which trait agreement indicates (e.g., "I", "R", "P", "E", etc.)

### Modifying Type Descriptions
Update the `typeDescriptions` object in `questions.js` to change how each personality type is described.

## Saving Form Submissions

Since this is a static GitHub Pages site, you'll need a third-party service to save quiz results. See **[FORM_SUBMISSIONS.md](FORM_SUBMISSIONS.md)** for detailed guides on:

- Google Sheets (Recommended - Free & Unlimited)
- EmailJS (Email notifications)
- Formspree (Simplest setup)
- Download as JSON (No service needed)
- Airtable (Best for analytics)

## License

MIT License - feel free to use and modify for your own projects!

### Colors
I: '#ffc6ff' Pink, R: '#caffbf' Green, 
P: '#ffadad' Red, E: '#bdb2ff' Purple,
S: '#ffd6a5' Orange, V: '#9bf6ff' Cyan, 
F: '#a0c4ff' Blue, C: '#fdffb6' Yellow,