# Form Submission Options for HCER Quiz

Since this is a static site hosted on GitHub Pages, you'll need a third-party service to save form submissions. Here are your best options:

## Option 1: Google Sheets (Recommended - Free & Easy)

### Using Google Apps Script

**Pros:**
- Free
- Full control over data
- Easy to view/export
- No coding needed for basic setup

**How to implement:**

1. Create a new Google Sheet
2. Go to **Extensions → Apps Script**
3. Paste this code:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    new Date(),
    data.type,
    data.scores.IR,
    data.scores.PE,
    data.scores.SV,
    data.scores.FC,
    data.email || ''
  ]);

  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Deploy as **Web App** (anyone can access)
5. Copy the deployment URL
6. Update `quiz.js` to send data after calculating results:

```javascript
// After line: sessionStorage.setItem('quizResults', JSON.stringify(result));
fetch('YOUR_GOOGLE_SCRIPT_URL', {
  method: 'POST',
  body: JSON.stringify(result)
});
```

---

## Option 2: Email via EmailJS (Easy Setup)

**Pros:**
- Free tier (200 emails/month)
- Sends results directly to your email
- Simple setup

**How to implement:**

1. Sign up at [emailjs.com](https://www.emailjs.com/)
2. Create an email service and template
3. Add EmailJS SDK to `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

4. Update `quiz.js`:

```javascript
// Initialize EmailJS
emailjs.init('YOUR_PUBLIC_KEY');

// After calculating results
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
  to_email: 'your@email.com',
  type: result.type,
  scores: JSON.stringify(result.scores),
  date: new Date().toLocaleString()
});
```

---

## Option 3: Formspree (Simplest)

**Pros:**
- Extremely simple (1 line change)
- Free tier (50 submissions/month)
- Emails you results

**How to implement:**

1. Sign up at [formspree.io](https://formspree.io/)
2. Create a new form
3. Update your HTML form to use Formspree action:

```html
<form id="quizForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

4. Add hidden fields for results:

```html
<input type="hidden" name="personality_type" id="hiddenType">
<input type="hidden" name="scores" id="hiddenScores">
```

5. Update `quiz.js` before navigation:

```javascript
document.getElementById('hiddenType').value = result.type;
document.getElementById('hiddenScores').value = JSON.stringify(result.scores);
```

---

## Option 4: Download as JSON (No Service Needed)

**Pros:**
- Completely free
- No third-party service
- Users keep their own data

**How to implement:**

Add a "Download Results" button on results page and add this to `results.js`:

```javascript
function downloadResults() {
  const dataStr = JSON.stringify(results, null, 2);
  const dataBlob = new Blob([dataStr], {type: 'application/json'});
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `hcer-results-${results.type}-${Date.now()}.json`;
  link.click();
}
```

---

## Option 5: Airtable (Best for Analytics)

**Pros:**
- Free tier (1,000 records/base)
- Great UI for viewing data
- API access for analytics

**How to implement:**

1. Create an Airtable base with fields: Date, Type, IR, PE, SV, FC
2. Get your API key and base ID
3. **Warning:** Don't expose API key in frontend! Use Netlify Functions or similar
4. Or use [Airtable Forms](https://www.airtable.com/guides/build-custom-forms) for a no-code solution

---

## Comparison Table

| Option | Cost | Setup Time | Monthly Limit | Best For |
|--------|------|------------|---------------|----------|
| Google Sheets | Free | 15 min | Unlimited | Most users |
| EmailJS | Free* | 10 min | 200 emails | Small sites |
| Formspree | Free* | 5 min | 50 forms | Quick setup |
| Download JSON | Free | 10 min | Unlimited | Privacy-focused |
| Airtable | Free* | 20 min | 1,000 records | Analytics |

*Paid tiers available for higher limits

---

## Recommended Solution

**For your use case, I recommend Google Sheets** because:
1. Unlimited submissions
2. Easy to view and analyze data
3. Can export to CSV/Excel anytime
4. No monthly limits
5. Completely free

The setup takes ~15 minutes and you'll have a spreadsheet that automatically logs every quiz completion with timestamp, personality type, and all dimension scores.
