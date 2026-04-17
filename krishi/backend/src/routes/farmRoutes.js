// ============================================================
//  src/routes/farmRoutes.js
// ============================================================
import express from 'express';
import  authMiddleware from '../middleware/authMiddleware.js';
import {
  createFarm,
  getMyLands,
  getFarmById,
  updateFarm,
  deleteFarm,
} from '../controllers/farmController.js';

const router = express.Router();

// All farm routes are protected — must be logged in
router.use(authMiddleware);

// POST   /api/farm           → save new land
// GET    /api/farm/my-lands  → all lands for logged-in user
// GET    /api/farm/:id       → single land
// PUT    /api/farm/:id       → update land
// DELETE /api/farm/:id       → soft-delete land

router.post('/',          createFarm);
router.get('/my-lands',   getMyLands);
router.get('/:id',        getFarmById);
router.put('/:id',        updateFarm);
router.delete('/:id',     deleteFarm);

export default router;
