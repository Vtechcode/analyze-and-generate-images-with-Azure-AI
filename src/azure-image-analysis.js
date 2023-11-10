// azure-image-analysis.js
const isConfigured = () => {
    const endpoint = process.env.REACT_APP_AZURE_VISION_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_VISION_API_KEY;
  
    return Boolean(endpoint && apiKey);
  };
  
  const analyzeImage = async (imageUrl) => {
    if (!isConfigured()) {
      throw new Error('Azure Vision service is not configured');
    }
  
    const endpoint = process.env.REACT_APP_AZURE_VISION_ENDPOINT;
    const apiKey = process.env.REACT_APP_AZURE_VISION_API_KEY;
  
    const features = 'description,objects'; // Customize the visual features as needed
    const apiUrl = `${endpoint}?visualFeatures=${features}&language=en`;
  
    const headers = {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': apiKey,
    };
  
    const body = JSON.stringify({ url: imageUrl });
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: body,
      });
  
      if (!response.ok) {
        throw new Error('Image analysis failed');
      }
  
      const jsonResponse = await response.json();
      return jsonResponse;
    } catch (error) {
      console.error('Error analyzing image:', error.message);
      throw error;
    }
  };
  
  export { isConfigured, analyzeImage };
  