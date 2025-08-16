import React from 'react';
import './Result.css';

const Result = ({ optimizedText, onReOptimize }) => {
  const handleDownload = () => {
    const blob = new Blob([optimizedText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optimized_resume.txt';
    link.click();
  };

   const handleReOptimize = () => {
    onReOptimize();
    // Smooth scroll to the optimize section
    const optimizeSection = document.getElementById('optimize-section');
    if (optimizeSection) {
      optimizeSection.scrollIntoView({ behavior: 'smooth' });
    }
    };

  return (
    <div className="result-section">
      <h2>Optimized Resume</h2>

      <div className="result-box">
        {optimizedText ? optimizedText : "Your optimized resume will appear here..."}
      </div>

      <div className="result-buttons">
        <button 
          className="download-btn" 
          onClick={handleDownload}
          disabled={!optimizedText}
        >
          Download
        </button>

        {optimizedText && (
          <button 
            className="reoptimize-btn"
            onClick={handleReOptimize}
          >
            Re-Optimize
          </button>
        )}
      </div>
    </div>
  );
}

export default Result;
