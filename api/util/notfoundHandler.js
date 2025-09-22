const fs = require('fs');

const notfoundHandler = (req, res) => {
    res.status(404);
    
    // Check if request is from browser or API
    const isAPIRequest = req.headers.accept && !req.headers.accept.includes('text/html');
    
    if (isAPIRequest) {
        // Send JSON response for API requests
        res.json({
            status: 404,
            error: "Not Found", 
            message: "The requested resource was not found",
            path: req.originalUrl
        });
    } else {
        const html = fs.readFileSync('view/404.html', 'utf8');
        res.send(html);
    }
}

module.exports = notfoundHandler;