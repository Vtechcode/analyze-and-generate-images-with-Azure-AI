// App.js
import React, { useState } from 'react';
import { isConfigured, analyzeImage } from './azure-image-analysis';

function App() {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAnalysisClick = async () => {
    try {
      setIsAnalyzing(true);

      const result = await analyzeImage(inputText);
      setAnalysisResult(result);
    } catch (error) {
      // Handle error
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerationClick = () => {
    // Add your code to handle image generation here
  };

  const DisplayResults = () => {
    if (!analysisResult) {
      return null;
    }

    return (
      <div>
        <h2>Analysis Result:</h2>
        <p>Processed Image URL: {analysisResult.image?.source || inputText}</p>
        <img
          src={analysisResult.image?.source || inputText}
          alt="Processed Image"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <pre>{JSON.stringify(analysisResult, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Image Analysis and Generation</h1>
      <input
        type="text"
        placeholder="Enter Image URL or Prompt"
        value={inputText}
        onChange={handleInputChange}
      />
      <button onClick={handleAnalysisClick} disabled={isAnalyzing}>
        {isAnalyzing ? 'Analyzing...' : 'Analyze Image'}
      </button>
      <button onClick={handleGenerationClick}>Generate Image</button>

      {isAnalyzing && <p>Processing, please wait...</p>}
      <DisplayResults />
    </div>
  );
}

export default App;
