import React, { useState } from 'react';
import './App.css';

function App() {
  const [codeInput, setCodeInput] = useState('// Write your code here\nconsole.log("Hello, World!");');
  const [output, setOutput] = useState('');
  const [codeHistory, setCodeHistory] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleRun = () => {
    setOutput('Running code...');
    setCodeHistory((prevHistory) => [...prevHistory, codeInput]); // Add current code to history
  };

  const handleDebugAndOptimize = () => {
    setOutput('Optimizing code with AI...');
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'output.txt';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.share({
      title: 'Code Output',
      text: output,
    }).catch((error) => {
      console.error('Sharing failed:', error);
    });
  };

  const handleAnalysisAndSuggestion = () => {
    setOutput('Analyzing code and providing suggestions...');
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📜 Code History</h2>
        <ul className="history-list">
          {codeHistory.map((code, index) => (
            <li key={index} className="history-item">
              <pre>{code}</pre>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="app-header">
          <h1>✨ AI Code Execution Sandbox ✨</h1>
        </header>
        <main className="sandbox">
          <div className="input-container">
            <h2>💻 Code Input</h2>
            <textarea
              className="code-input"
              value={codeInput}
              onChange={(e) => setCodeInput(e.target.value)}
            />
          </div>

          {/* Language Selection */}
          <div className="dropdown-container">
            <label htmlFor="language-select" className="dropdown-label">🌍 Language:</label>
            <select
              id="language-select"
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="language-dropdown"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
            </select>
          </div>

          {/* Buttons Container */}
          <div className="button-container">
            <button className="run-button" onClick={handleRun}>Run</button>
            <button className="debug-button" onClick={handleDebugAndOptimize}>Debug and Optimize with AI</button>
            <button className="run-button" onClick={handleAnalysisAndSuggestion}>Analyze & Suggest</button>
          </div>

          <div className="output-container">
            <h2>📤 Output</h2>
            <textarea
              className="code-output"
              value={output}
              onChange={(e) => setOutput(e.target.value)} // Editable output
            />
          </div>

          {/* Share and Download Buttons */}
          <div className="button-container">
            <button className="run-button" onClick={handleDownload}>Download Output</button>
            <button className="debug-button" onClick={handleShare}>Share Output</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
