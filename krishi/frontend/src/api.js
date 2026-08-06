// ============================================================
//  src/api.js — Centralized API base URL
//
//  In development:  Vite proxy handles /api → backend
//  In production:   Backend serves dist, so relative URLs work
//  Separate deploy: Set VITE_API_URL env var
// ============================================================

const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
