import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import resumeLogo from '../../assets/resumeLogo.png';
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleHelpClick = () => {
    if (location.pathname === "/help") {
      navigate("/"); // already in help → go home
    } else {
      navigate("/help"); // go to help
    }
  };

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <img src={resumeLogo} alt="Resume Genie Logo" className="logo" />
      </div>

      <div className="nav-right">
        <div className="nav-help">
          <button onClick={handleHelpClick} className="help-btn">
            <FontAwesomeIcon icon={faCircleInfo} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
