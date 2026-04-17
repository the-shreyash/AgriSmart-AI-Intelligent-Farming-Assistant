// ============================================================
//  src/routes/healthRoutes.js
// ============================================================
import express   from'express';
import { health }from'../controllers/healthController.js';

const router = express.Router();

// GET /api/health
router.get('/health', health);

export default router;
