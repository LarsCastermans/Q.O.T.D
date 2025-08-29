// save-screenshot.js
// Requires html2canvas (add <script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script> to your HTML)

function saveReportScreenshotToGallery() {
  const reportDiv = document.getElementById('report');
  if (!reportDiv) {
    alert("Report area not found!");
    return;
  }

  html2canvas(reportDiv).then(function(canvas) {
    // Create a link to download the image as PNG
    const link = document.createElement('a');
    link.download = 'reflectie_report.png'; // The file name
    link.href = canvas.toDataURL('image/png');
    document.body.appendChild(link); // Required for Firefox
    link.click();
    document.body.removeChild(link);
    alert("Screenshot saved! Check your Downloads or Gallery.");
  });
}
