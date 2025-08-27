import React, { useState } from "react";
import mammoth from "mammoth";
import * as pdfjsLib from "pdfjs-dist";

function ResumeUploader() {
  const [resumeText, setResumeText] = useState("");
  const [keywords, setKeywords] = useState("");
  const [prompt, setPrompt] = useState("");

  // Handle file upload
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      // Extract PDF text
      const fileReader = new FileReader();
      fileReader.onload = async function () {
        const typedArray = new Uint8Array(this.result);
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map((s) => s.str).join(" ") + "\n";
        }
        setResumeText(text);
      };
      fileReader.readAsArrayBuffer(file);
    } else if (
      file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      // Extract DOCX text
      const arrayBuffer = await file.arrayBuffer();
      const { value } = await mammoth.extractRawText({ arrayBuffer });
      setResumeText(value);
    } else {
      alert("Only PDF and DOCX supported");
    }
  };

  // Send to backend
  const handleSubmit = async () => {
    const response = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resumeText,
        keywords,
        prompt,
      }),
    });

    const data = await response.json();
    console.log("Optimized Resume:", data.optimizedText);
  };

  return (
    <div>
      <input type="file" accept=".pdf,.docx" onChange={handleFileUpload} />
      <input
        type="text"
        placeholder="Keywords (comma separated)"
        value={keywords}
        onChange={(e) => setKeywords(e.target.value)}
      />
      <input
        type="text"
        placeholder="Special request (e.g. tailor for Data Analyst)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={handleSubmit}>Optimize Resume</button>
    </div>
  );
}

export default ResumeUploader;
