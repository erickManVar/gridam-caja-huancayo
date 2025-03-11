const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.ttf': 'font/ttf',
    '.woff': 'font/woff',
    '.woff2': 'font/woff2',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'font/otf'
};

const server = http.createServer((req, res) => {
    console.log(`Request: ${req.method} ${req.url}`);
    
    // Normalize URL by removing query parameters and trailing slashes
    let url = req.url.split('?')[0];
    
    // If URL ends with a slash or is empty, serve index.html
    if (url.endsWith('/') || url === '') {
        url += 'index.html';
    }
    
    // Resolve the file path
    const filePath = path.join(__dirname, url);
    const extension = path.extname(filePath).toLowerCase();
    
    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // File not found
            console.log(`File not found: ${filePath}`);
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end('<h1>404 Not Found</h1><p>The requested resource was not found on this server.</p>');
            return;
        }
        
        // Determine the content type
        const contentType = MIME_TYPES[extension] || 'application/octet-stream';
        
        // Read and serve the file
        fs.readFile(filePath, (err, content) => {
            if (err) {
                // Server error
                console.error(`Error reading file: ${err}`);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end('<h1>500 Internal Server Error</h1><p>An error occurred while processing your request.</p>');
                return;
            }
            
            // Success
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
    console.log(`Press Ctrl+C to stop the server`);
});
