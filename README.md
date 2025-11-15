# IRSP Relationship Typology Quiz

A modern, interactive personality quiz that helps users discover their 4-letter romantic personality type based on the IRSP framework (Idealist/Realist, Physical/Emotional, Social/Private, Forgiving/Critical).

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

## The IRSP Framework

The quiz measures four key dimensions of romantic behavior:

1. **I/R - Hope Dimension**: Idealist vs Realist
2. **P/E - Connection Dimension**: Physical vs Emotional
3. **S/V - Expression Dimension**: Social vs Private
4. **F/C - Conflict Dimension**: Forgiving vs Critical

Results in one of 16 personality types (e.g., IPSF - The Tender Romantic).

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

### Adding/Modifying Questions
Edit `questions.js` to add or modify questions. Each question requires:
- `text`: The question statement
- `dimension`: One of "IR", "PE", "SV", "FC"
- `direction`: Which trait agreement indicates (e.g., "I", "R", "P", "E", etc.)

### Changing Colors/Styling
Edit `styles.css`. The main gradient is defined in the `body` selector and can be customized throughout the file.

### Modifying Type Descriptions
Update the `typeDescriptions` object in `questions.js` to change how each personality type is described.

## License

MIT License - feel free to use and modify for your own projects!
