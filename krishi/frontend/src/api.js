// ============================================================
//  src/api.js — Centralized API base URL
//
//  In development:  Vite proxy handles /api → backend
//  In production:   Backend serves dist, so relative URLs work
//  Separate deploy: Set VITE_API_URL env var
// ============================================================

// Normalize VITE_API_URL: strip any trailing slash, fallback to '/api' in local Vite dev mode
const rawApiUrl = import.meta.env.VITE_API_URL || '/api';
const API_BASE = rawApiUrl.replace(/\/+$/, '');

export default API_BASE;
