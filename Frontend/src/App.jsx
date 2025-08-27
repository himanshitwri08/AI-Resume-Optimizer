import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './component/Navbar/Navbar.jsx';
import Hero from './component/Hero/Hero.jsx';
import Upload from './component/Upload/Upload.jsx';
import Optimize from './component/Optimize/Optimize.jsx';
import Result from './component/Result/Result.jsx';
import Footer from './component/Footer/Footer.jsx';
import Help from './component/Help/Help.jsx';

const App = () => {
  const [resumeText, setResumeText] = useState('');   
  const [optimizedText, setOptimizedText] = useState('');

  const handleOptimization = async (keywords, prompt) => {
    try {
      const response = await fetch("http://localhost:5000/api/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText, keywords, prompt }), 
      });

      const data = await response.json();
      setOptimizedText(data.optimizedText);
    } catch (error) {
      console.error("Error optimizing resume:", error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>

            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  {/* Pass setResumeText to Upload */}
                  <Upload onExtract={(text) => setResumeText(text)} />

                  {/* Show Optimize form only if text extracted */}
                  {!optimizedText && resumeText && (
                    <Optimize onOptimize={handleOptimization} />
                  )}

                  {/* Show Result only after optimization */}
                  {optimizedText && (
                    <Result
                      optimizedText={optimizedText}
                      onReOptimize={() => setOptimizedText('')}
                    />
                  )}
                </>
              }
            />

            {/* Help Page */}
            <Route path="/help" element={<Help />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
