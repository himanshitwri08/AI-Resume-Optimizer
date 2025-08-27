import React, { useRef, useState } from "react";
import "./Upload.css";
import { GlobalWorkerOptions, getDocument } from "pdfjs-dist/build/pdf";
import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";
import mammoth from "mammoth";
GlobalWorkerOptions.workerSrc = workerSrc;

// Default backend URL
const DEFAULT_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/optimize";

/**
 * Upload Component
 * Handles resume upload (PDF/DOCX), extracts text, and optionally sends it to backend.
 */
const Upload = ({ onExtract = () => { }, autoSend = false, backendUrl = DEFAULT_BACKEND_URL }) => {
  // UI states
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fileInputRef = useRef(null);

  // Sends extracted text to backend API
  const sendToBackend = async (resumeText, keywords = "", prompt = "") => {
    try {
      const res = await fetch(backendUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, keywords, prompt }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      return await res.json();
    } catch (err) {
      console.error("sendToBackend error:", err);
      setError("Failed to send data to backend.");
      return null;
    }
  };

  // Extracts text from uploaded file (PDF or DOCX)
  const processFile = async (file) => {
    if (!file) return;
    setError("");
    setFileName(file.name);
    setLoading(true);

    try {
      const name = (file.name || "").toLowerCase();
      const ext = name.includes(".") ? name.split(".").pop() : "";

      const isPdf = ext === "pdf" || file.type === "application/pdf";
      const isDocx = ext === "docx" || file.type.includes("officedocument.wordprocessingml.document") || file.type === "application/msword";

      if (isPdf) {
        // PDF → extract text from each page
        const arrayBuffer = await file.arrayBuffer();
        const typed = new Uint8Array(arrayBuffer);
        const pdf = await getDocument(typed).promise;

        const pagePromises = Array.from({ length: pdf.numPages }, (_, i) =>
          pdf.getPage(i + 1)
            .then((page) => page.getTextContent())
            .then((content) => content.items.map((s) => s.str).join(" "))
        );

        const pages = await Promise.all(pagePromises);
        const extractedText = pages.join("\n");

        onExtract(extractedText);
        if (autoSend) await sendToBackend(extractedText);

      } else if (isDocx) {
        // DOCX → extract text using mammoth
        const arrayBuffer = await file.arrayBuffer();
        const { value } = await mammoth.extractRawText({ arrayBuffer });
        const extractedText = value || "";

        onExtract(extractedText);
        if (autoSend) await sendToBackend(extractedText);

      } else {
        setError("Unsupported file type. Please upload a PDF or DOC/DOCX file.");
      }
    } catch (err) {
      console.error("processFile error:", err);
      setError("Failed to extract text from the uploaded file.");
    } finally {
      setLoading(false);
    }
  };

  // Handles file selection from input
  const handleFileUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    processFile(file);
    e.target.value = null; // reset input
  };

  // Handles drag & drop upload
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  // Replace file 
  const handleReplace = () => fileInputRef.current?.click();

  // Remove uploaded file
  const handleRemove = () => {
    setFileName("");
    setError("");
    onExtract("");
  };

  return (
    <div className="upload">
      <h2>Upload Your Resume</h2>

      {/* Hidden input field */}
      <input
        ref={fileInputRef}
        type="file"
        id="fileUpload"
        accept=".pdf, .docx"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />

      {/* Upload box */}
      <div
        className={`upload-outerbox ${dragActive ? "drag-active" : ""}`}
        onDragEnter={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => { e.preventDefault(); setDragActive(false); }}
        onDrop={handleDrop}
      >

        {!fileName ? (
          <>
            {/* Upload button */}
            <label
              htmlFor="fileUpload"
              className="upload-btn"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click(); }}
              onClick={() => fileInputRef.current?.click()}
            >
              {loading ? "Processing..." : "Upload Resume"}
            </label>

            <h3>Or drag and drop Resume here</h3>

            {/* Show errors */}
            {error && <p className="error" role="alert">{error}</p>}

            {/* Screen reader status */}
            <div aria-live="polite" className="sr-status">
              {loading ? "Extracting text..." : ""}
            </div>
          </>
        ) : (
          // After file is uploaded
          <div className="uploaded-summary-box" role="status" aria-live="polite">
            <p className="uploaded-file">📄 {fileName} uploaded</p>

            <div className="uploaded-actions">
              <button type="button" className="replace-btn" onClick={handleReplace}>
                Replace Resume
              </button>

              <button type="button" className="remove-btn" onClick={handleRemove}>
                Remove
              </button>
            </div>

            {error && <p className="error" role="alert">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
