function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Basic data
    const row = [
      data.timestamp || new Date().toISOString(),
      data.type,
      data.identity || 'Not provided',  // NEW: Identity field
      data.scores.IR,
      data.scores.PE,
      data.scores.SV,
      data.scores.FC
    ];

    // Add all 50 individual answers
    if (data.answers && data.answers.length > 0) {
      row.push(...data.answers);
    } else {
      // Fill with 0s if missing
      for (let i = 0; i < 50; i++) {
        row.push(0);
      }
    }

    // Add metrics
    if (data.metrics) {
      row.push(
        data.metrics.totalTimeSeconds || 0,
        data.metrics.timeToFirstAnswer || 0,
        data.metrics.screenWidth || 0,
        data.metrics.screenHeight || 0,
        data.metrics.referrer || '',
        data.metrics.timezone || '',
        data.metrics.language || '',
        data.metrics.userAgent || ''
      );
    }

    // Append the row
    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
