
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Middleware to serve static files and parse JSON bodies
app.use(express.static('public'));
app.use(express.json());

// Route to handle chat completion requests
app.post('/api/query', async (req, res) => {
    try {
        // Make an API call to the OpenAI chat completion endpoint
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo", // Make sure to use the correct model name
            messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: req.body.prompt }]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Log the full response data
        console.log('OpenAI API Response:', JSON.stringify(response.data, null, 2));

        // Extract the message content and send back to the client
        const messageContent = response.data.choices[0].message.content;
        res.json({ message: messageContent });

    } catch (error) {
        // Log the error details
        console.error('Error with OpenAI API:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        // Send a 500 Internal Server Error response to the client
        res.status(500).json({ error: 'Failed to fetch response from OpenAI', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    // Log the API key for debugging purposes
    console.log(`Using OpenAI API Key: ${process.env.OPENAI_API_KEY}`);
});

