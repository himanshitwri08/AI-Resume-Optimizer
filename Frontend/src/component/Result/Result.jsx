// import React from 'react';
// import './Result.css';
// import { Document, Packer, Paragraph, TextRun } from 'docx';

// const Result = ({ optimizedText, onReOptimize }) => {

//   // Function to parse **bold** text
//   const parseLine = (line) => {
//     const parts = [];
//     const regex = /\*\*(.*?)\*\*/g;  // finds **bold** parts
//     let lastIndex = 0;
//     let match;

//     while ((match = regex.exec(line)) !== null) {
//       if (match.index > lastIndex) {
//         parts.push(new TextRun(line.slice(lastIndex, match.index))); // normal text
//       }
//       parts.push(new TextRun({ text: match[1], bold: true })); // bold text
//       lastIndex = match.index + match[0].length;
//     }

//     if (lastIndex < line.length) {
//       parts.push(new TextRun(line.slice(lastIndex))); // remaining text
//     }

//     return parts;
//   };

//   const handleDownload = async () => {
//     const lines = optimizedText.split('\n');

//     // Create DOCX paragraphs with formatting
//     const paragraphs = lines.map((line, index) => {
//       if (index === 0) {
//         return new Paragraph({
//           children: parseLine(line), //  stars handled
//           spacing: { after: 200 },
//         });
//       }

//       if (line.endsWith(':')) {
//         return new Paragraph({
//           children: parseLine(line), //  stars handled
//           spacing: { before: 200, after: 100 },
//         });
//       }

//       return new Paragraph({
//         children: parseLine(line), // stars handled
//         spacing: { after: 100 },
//       });
//     });

//     const doc = new Document({
//       sections: [{ children: paragraphs }],
//     });

//     const blob = await Packer.toBlob(doc);
//     const link = document.createElement('a');
//     link.href = URL.createObjectURL(blob);
//     link.download = 'optimized_resume.docx';
//     link.click();
//   };


//   const handleReOptimize = () => {
//     onReOptimize();
//     // Smooth scroll to the optimize section
//     const optimizeSection = document.getElementById('optimize-section');
//     if (optimizeSection) {
//       optimizeSection.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="result-section">
//       <h2>Optimized Resume</h2>

//       <div className="result-box">
//         {optimizedText ? (
//           <div className="optimized-text">
//             {optimizedText.split('\n').map((line, index) => (
//               <p key={index}>{line}</p>
//             ))}
//           </div>
//         ) : (
//           "Your optimized resume will appear here..."
//         )}
//       </div>

//       <div className="result-buttons">
//         <button
//           className="download-btn"
//           onClick={handleDownload}
//           disabled={!optimizedText}
//         >
//           Download DOCX
//         </button>

//         {optimizedText && (
//           <button
//             className="reoptimize-btn"
//             onClick={handleReOptimize}
//           >
//             Re-Optimize
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Result;

// src/component/Result/Result.jsx
import React from 'react';
import './Result.css';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const Result = ({ optimizedText, onReOptimize }) => {
  // Function to parse **bold** text for DOCX (kept as you had)
  const parseLine = (line) => {
    const parts = [];
    const regex = /\*\*(.*?)\*\*/g;
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(new TextRun(line.slice(lastIndex, match.index)));
      }
      parts.push(new TextRun({ text: match[1], bold: true }));
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      parts.push(new TextRun(line.slice(lastIndex)));
    }

    return parts;
  };

  const handleDownload = async () => {
    const lines = optimizedText.split('\n');

    const paragraphs = lines.map((line, index) => {
      if (index === 0) {
        return new Paragraph({
          children: parseLine(line),
          spacing: { after: 200 },
        });
      }

      if (line.endsWith(':')) {
        return new Paragraph({
          children: parseLine(line),
          spacing: { before: 200, after: 100 },
        });
      }

      return new Paragraph({
        children: parseLine(line),
        spacing: { after: 100 },
      });
    });

    const doc = new Document({
      sections: [{ children: paragraphs }],
    });

    const blob = await Packer.toBlob(doc);
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'optimized_resume.docx';
    link.click();
  };

  const handleReOptimize = () => {
    onReOptimize();
    const optimizeSection = document.getElementById('optimize-section');
    if (optimizeSection) {
      optimizeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="result-section">
      <h2 className="result-title">Optimized Resume</h2>

      <div className="result-box">
        {optimizedText ? (
          <div className="optimized-text">
            {/* Resume-like "paper" preview */}
            <div className="resume-paper">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                // small custom components to ensure links open new tab and preserve semantics
                components={{
                  a: ({node, ...props}) => <a {...props} target="_blank" rel="noopener noreferrer" />,
                  // keep lists & headings as default (styling via CSS)
                }}
              >
                {optimizedText}
              </ReactMarkdown>
            </div>
          </div>
        ) : (
          <div className="placeholder">Your optimized resume will appear here...</div>
        )}
      </div>

      <div className="result-buttons">
        <button
          className="download-btn"
          onClick={handleDownload}
          disabled={!optimizedText}
        >
          Download DOCX
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
};

export default Result;

