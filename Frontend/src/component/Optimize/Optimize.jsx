import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './Optimize.css';

const Optimize = ({ onOptimize }) => {
  const [keywords, setKeywords] = useState('');
  const [prompt, setPrompt] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); 
  const [optimizedText, setOptimizedText] = useState('');

  const handleOptimize = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!keywords.trim()) {
      newErrors.keywords = "*required";
    }
    if (!prompt.trim()) {
      newErrors.prompt = "*required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true); // button spinner
      try {
        const result = await onOptimize(keywords, prompt);
        if (typeof result === 'string' && result.trim()) {
          setOptimizedText(result);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="optimize" id="optimize-section">
      <h2>Optimize Your Resume</h2>

      <form className="optimize-form" onSubmit={handleOptimize}>

        {/* Keywords input */}
        <div className="keyword-section">
          <label>Enter Keywords:</label>
          <input
            type="text"
            placeholder="e.g. AI, Python, React, JavaScript"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          {errors.keywords && <span className="error-text">{errors.keywords}</span>}
        </div>

        {/* Prompt textarea */}
        <div className="prompt-section">
          <label>Custom Prompt:</label>
          <textarea
            placeholder="Write how you want AI to optimize your resume..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          {errors.prompt && <span className="error-text">{errors.prompt}</span>}
        </div>

        {/* Optimize button */}
        <button type="submit" className="optimize-btn" disabled={loading}>
          {loading ? <div className="spinner"></div> : "Optimize"}
        </button>
      </form>

      {/* Render the optimized resume  */}
      {optimizedText ? (
        <div className="optimized-result">
          <div className="optimized-label">Optimized Resume</div>
          <div className="optimized-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node, ...props }) => <a {...props} target="_blank" rel="noopener noreferrer" />
              }}
            >
              {optimizedText}
            </ReactMarkdown>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Optimize;
