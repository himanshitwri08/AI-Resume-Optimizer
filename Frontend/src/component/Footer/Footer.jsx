import React from 'react'
import './Footer.css';
const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2025 AI Resume Optimizer. All rights reserved.</p>
      <p className='footer-text'>Turning your resume into an interview-winning profile</p>
      <div className="contact-info">
        <p className="contact-info-left">
          Contact:
          <a href="mailto:himanshitiwari960@gmail.com">himanshitiwari960@gmail.com</a>
          </p>
        <p className="contact-info-right">
          Follow on: 
          <a href="https://github.com/himanshitwri08">Github</a>
           <a href="http://www.linkedin.com/in/himanshi-tiwari810">LinkedIn</a>
           </p>
      </div>
    </div>
  )
}

export default Footer
