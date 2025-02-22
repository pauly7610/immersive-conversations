import React, { useState } from 'react';

const HuggingFaceAPI = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const fetchResponse = async () => {
    const apiKey = process.env.REACT_APP_HUGGING_FACE_API_KEY;
    const model = 'distilgpt2';

    try {
      const res = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: "Once upon a time,",
          parameters: {
            max_length: 512,
            temperature: 0.5
          }
        }),
      });

      const data = await res.json();
      setResponse(data[0]?.generated_text || 'No response');
    } catch (error) {
      console.error('Error fetching response:', error);
      setResponse('Error fetching response');
    }
  };

  return (
    <div>
      <h2>Chat with DistilGPT-2</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message here..."
      />
      <button onClick={fetchResponse}>Send</button>
      <div>
        <h3>Response:</h3>
        <p>{response}</p>
      </div>
    </div>
  );
};

export default HuggingFaceAPI; 