import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';

import { rateLimiter } from './src/middleware/rateLimiter.js';
import { requestLogger } from './src/middleware/requestLogger.js';
import  errorHandler  from './src/middleware/errorHandler.js';

import recommendRoutes from './src/routes/recommendRoutes.js';
import newRecommendRoutes from './src/routes/newRecommendRoutes.js';
import farmRoutes from './src/routes/farmRoutes.js';
import healthRoutes from './src/routes/healthRoutes.js';
import ttsRoutes from './src/routes/ttsRoutes.js';
import authRoutes from './src/routes/authRoutes.js';

const app = express();





const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI;
// ── Security ────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false }));

// ── CORS ────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    'https://kisan-ai-nalh.vercel.app',
     'https://kisan-ai-coral.vercel.app',
  ],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── MongoDB Connection 🔥 ───────────────────────────────────
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
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
app.use('/api', recommendRoutes); // Keep old one for backward compatibility if needed, or remove later
app.use('/api/recommendation', newRecommendRoutes); // New recommendation endpoints
app.use('/api/farm', farmRoutes);     // Farm endpoints
app.use('/api', healthRoutes);
app.use('/api', ttsRoutes);
app.use('/api/auth', authRoutes); // ✅ NEW (Auth routes)

// ── Root Route ──────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.send('Kisan AI Backend is running 🚀');
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
  console.log(`║   ☁️   Weather:  ${process.env.OPENWEATHER_API_KEY ? '✅ configured' : '❌ MISSING'}`);
  console.log('╚═══════════════════════════════════════════════╝\n');
});
export default app;