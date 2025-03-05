import axios from 'axios';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { model, inputs, parameters } = req.body;
    
    // Validate required fields
    if (!model || !inputs) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
    
    // API key is stored in Vercel environment variables
    const API_KEY = process.env.HUGGING_FACE_API_KEY;
    
    if (!API_KEY) {
      console.error('API key is missing in environment variables');
      return res.status(500).json({ error: 'Server configuration error' });
    }
    
    const response = await axios.post(
      `https://api-inference.huggingface.co/models/${model}`,
      { inputs, parameters },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Return the data to the client
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    
    // Check if it's an API error with a response
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'API request failed',
        message: error.response.data.error || error.message,
        status: error.response.status
      });
    }
    
    // Generic error handling
    return res.status(500).json({ 
      error: 'Failed to process request',
      message: error.message 
    });
  }
} 