const express = require('express');
const path = require('path');
const app = express();
const chatbotRouter = require('./chatbot/caja_huancayo_api');

// Middleware for parsing JSON bodies
app.use(express.json());

// Serve static files
app.use(express.static(__dirname));

// Chat API routes
app.use('/api', chatbotRouter);

// Catch-all route to serve index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
