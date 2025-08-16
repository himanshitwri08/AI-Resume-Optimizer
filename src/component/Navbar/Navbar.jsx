import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import resumeLogo from '../../assets/resumeLogo.png';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-left">
        <img src={resumeLogo} alt="Resume Genie Logo" className="logo" />
      </div>

      <div className="nav-right">
        <div className="nav-help">
          <Link to="/help">
            <FontAwesomeIcon icon={faCircleInfo} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Navbar;

