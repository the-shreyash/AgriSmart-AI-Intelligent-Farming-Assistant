import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';

import { rateLimiter } from './src/middleware/rateLimiter.js';
import { requestLogger } from './src/middleware/requestLogger.js';
import  errorHandler  from './src/middleware/errorHandler.js';

import recommendRoutes from './src/routes/recommendRoutes.js';
import newRecommendRoutes from './src/routes/newRecommendRoutes.js';
import farmRoutes from './src/routes/farmRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js';
import ttsRoutes from './src/routes/ttsRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

// ── __dirname for ES modules ────────────────────────────────
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app = express();

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
const isProduction = process.env.NODE_ENV === 'production';

// ── Security ────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));

// ── CORS ────────────────────────────────────────────────────
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
  'https://kisan-ai-nalh.vercel.app',
  'https://kisan-ai-coral.vercel.app',
  'https://agrismart-ai-intelligent-farming.onrender.com'
];
// Add FRONTEND_URL from env if set (stripping any trailing slash)
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL.replace(/\/+$/, ''));
}

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    const cleanOrigin = origin.replace(/\/+$/, '');
    const isAllowed = allowedOrigins.some(o => o.replace(/\/+$/, '') === cleanOrigin);
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`[CORS Blocked] Origin not allowed: ${origin}`);
      callback(new Error('Blocked by CORS policy: Origin not allowed'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle OPTIONS preflight for all routes

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── MongoDB Connection 🔥 ───────────────────────────────────
if (MONGO_URI) {
  mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.error('❌ MongoDB error:', err.message));
} else {
  console.log('⚠️ MONGO_URI not found in .env');
}

// ── Logging ─────────────────────────────────────────────────
app.use(requestLogger);

// ── Rate Limiting ───────────────────────────────────────────
app.use('/api/', rateLimiter);

// ── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes); // ✅ Mounted first so auth endpoints remain accessible & public
app.use('/api', recommendRoutes); // Keep old one for backward compatibility if needed, or remove later
app.use('/api/recommendation', newRecommendRoutes); // New recommendation endpoints
app.use('/api/farm', farmRoutes);     // Farm endpoints
app.use('/api', healthRoutes);
app.use('/api', ttsRoutes);

// ── Serve Frontend (Production) ─────────────────────────────
// In production, serve the built frontend from ../frontend/dist
const distPath = path.join(__dirname, '..', 'frontend', 'dist');

app.use(express.static(distPath));

// SPA catch-all: any non-API route → index.html (for React Router)
app.get('*', (req, res, next) => {
  // Don't catch API routes
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'), (err) => {
    if (err) {
      // If dist doesn't exist (dev mode), just send a message
      res.send('Kisan AI Backend is running 🚀 (frontend not built — run: cd frontend && npm run build)');
    }
  });
});

// ── Error Handler ───────────────────────────────────────────
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔═══════════════════════════════════════════════╗');
  console.log('║   🌾  KISAN AI  —  Backend Server Started      ║');
  console.log(`║   🌐  API:      http://localhost:${PORT}/api      ║`);
  console.log(`║   🔐  Auth:     http://localhost:${PORT}/api/auth ║`); // ✅ NEW
  console.log(`║   🔊  TTS:      http://localhost:${PORT}/api/tts  ║`);
  console.log(`║   📋  Health:   http://localhost:${PORT}/api/health║`);
  console.log(`║   🌾  Farm:     http://localhost:${PORT}/api/farm ║`);
  console.log(`║   🤖  Rec:      http://localhost:${PORT}/api/recommendation/generate ║`);
  console.log(`║   🤖  Gemini:   ${process.env.GEMINI_API_KEY  && process.env.GEMINI_API_KEY  !== 'your_gemini_api_key_here'  ? '✅ configured' : '❌ MISSING'}`);
  console.log(`║   🔑  Google:   ${process.env.GOOGLE_CLIENT_ID ? '✅ configured' : '❌ MISSING'}`);
  console.log(`║   ☁️   Weather:  ${process.env.OPENWEATHER_API_KEY ? '✅ configured' : '❌ MISSING'}`);
  console.log(`║   🗄️   MongoDB:  ${MONGO_URI ? '✅ configured' : '❌ MISSING'}`);
  console.log(`║   📁  Serving:  ${isProduction ? 'Production (dist)' : 'Development'}`);
  console.log('╚═══════════════════════════════════════════════╝\n');
});
export default app;