
import express from 'express';
import  authMiddleware  from '../middleware/authMiddleware.js';
import {
  generate,
  getLatest,
  getHistory,
  getById,
} from '../controllers/recommendationController.js';

const router = express.Router();

// Optionally allow public access for demo, but require auth for history
// Let's protect them all for now or make a split.
// The prompt specifies: When user submits -> save with reference to logged in user.
// Let's pass the auth middleware but make it optional if we want guest access,
// but the prompt says "fetch latest result for user" so we'll enforce auth.

// We can define an optional auth middleware if we want guest access, 
// but to keep it simple and fulfill requirements, we'll mandate auth.
// Wait, the original recommendController was public.
// We'll require auth for these specific history routes, and use optional auth for generate.

// Let's define an optional auth middleware right here for generate
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'kisan-ai-secret-key';

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      req.user = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // ignore token errors for optional auth
    }
  }
  next();
}

// POST /api/recommendation/generate (optional auth so both guests and logged-in users can use it)
router.post('/generate', optionalAuth, generate);

// GET endpoints require user to be logged in
router.use(authMiddleware);

router.get('/latest',  getLatest);
router.get('/history', getHistory);
router.get('/:id',     getById);

export default router
