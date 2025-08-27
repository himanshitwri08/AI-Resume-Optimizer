import React from "react";  
import "./Help.css";

const Help = () => {
  return (
   <div className="help-page">
  <div className="faq">
    <h1>Help & FAQs</h1>
    <p>Here are some common questions to guide you:</p>

    <h3>1. How do I optimize my resume?</h3>
    <p>Go to the home page, upload your resume, enter keywords and a custom prompt, then click "Optimize".</p>

    <h3>2. What are keywords and why should I use them?</h3>
    <p>Keywords are important job-related terms (like “React”, “Teamwork”, “JavaScript”). Adding them helps the tool align your resume with job requirements.</p>

    <h3>3. What file formats are supported?</h3>
    <p>You can upload your resume in <strong>.pdf, .docx, or .txt</strong> format for optimization.</p>

    <h3>4. What is a custom prompt?</h3>
    <p>A custom prompt is an extra instruction you give to guide the optimization. Example: "Focus on leadership skills" or "Make it ATS-friendly".</p>

    <h3>5. Can I re-upload or remove my resume?</h3>
    <p>Yes, you can re-upload a new resume or remove the uploaded one anytime from the upload section.</p>

    <h3>6. Can I download the optimized resume?</h3>
    <p>Yes, after optimization, click the "Download" button. The file will be saved as <strong>.docx</strong>, which you can open in Microsoft Word or Google Docs.</p>

    <h3>7. Who can I contact for support?</h3>
    <p>Email us at <a href="mailto:himanshitiwari960@gmail.com">himanshitiwari960@gmail.com</a>.</p>
  </div>
</div>

  );
};

export default Help;
