// ============================================================
//  src/middleware/authMiddleware.js
//  Verifies JWT Bearer token and attaches decoded user to req
// ============================================================
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'kisan-ai-secret-key';

function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        error: 'Authorization token missing or malformed',
      });
    }

    const token   = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded payload { id, email, name } to every protected request
    req.user = decoded;
    next();
  } catch (err) {
    const msg =
      err.name === 'TokenExpiredError'
        ? 'Token has expired — please login again'
        : 'Invalid token';

    return res.status(401).json({ success: false, error: msg });
  }
}

module.exports = { authMiddleware };
