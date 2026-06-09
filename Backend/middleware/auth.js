const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
function verifyToken(req, res, next) {

    // Get the Authorization header from the incoming request
    const authHeader = req.headers.authorization;

    // Check if the Authorization header is present and starts with 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }

    // Extract the token from the Authorization header
    const token = authHeader.split(' ')[1];

    try {
        // Verify the token using the secret key and decode the user information
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user information to the request object for use in subsequent middleware or route handlers
        req.user = { id: decoded.userId };

        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

// Export the middleware function to be used in routes that require authentication
module.exports = verifyToken;