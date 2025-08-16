import React from 'react'
import './Upload.css'
const Upload = () => {
  return (
    <div className='upload'>
      <h2>Upload Your Resume</h2>
      <div className="upload-outerbox">
        <input type="file" id="fileUpload" accept=".pdf, .doc, .docx" />

        <label htmlFor='fileUpload' className="upload-btn">
            Upload Resume
        </label>

        <h3>Or drag and drop Resume here</h3>
      </div>
    </div>      

  )
}

export default Upload
