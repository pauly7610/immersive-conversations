import axios from 'axios';

// Simple in-memory rate limiting
// Note: This is reset when the serverless function cold starts
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

const ipRequests = {};

function isRateLimited(ip) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;
  
  // Initialize or clean up old requests
  ipRequests[ip] = ipRequests[ip] ? ipRequests[ip].filter(time => time > windowStart) : [];
  
  // Check if rate limited
  if (ipRequests[ip].length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }
  
  // Add current request
  ipRequests[ip].push(now);
  return false;
}

export default async function handler(req, res) {
  // Set CORS headers for Vercel deployment
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // In production, this will be your Vercel domain
  const origin = req.headers.origin;
  const allowedOrigins = [
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null,
    'https://your-app-name.vercel.app', // Replace with your actual Vercel domain
    'http://localhost:3000'
  ].filter(Boolean);
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get client IP
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  
  // Check rate limit
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests, please try again later' });
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