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
  const [optimizedText, setOptimizedText] = useState('');

  const handleOptimization = (keywords, prompt) => {
    const fakeResult = `Optimized Resume based on keywords: ${keywords}\nPrompt: ${prompt}`;
    setOptimizedText(fakeResult);
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
                  <Upload />
                  {!optimizedText && <Optimize onOptimize={handleOptimization} />}
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
