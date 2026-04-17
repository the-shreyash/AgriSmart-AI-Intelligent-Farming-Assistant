// ============================================================
//  src/controllers/farmController.js
//  Handles all "Land Information" CRUD for logged-in farmers
// ============================================================
const FarmInput = require('../models/FarmInput');
const User      = require('../models/User');

// ── POST /api/farm  ─────────────────────────────────────────
// Save a new land parcel and push its ID into user.farms[]
async function createFarm(req, res, next) {
  try {
    const { landName, location, soilType, season, waterAvailability, farmSize } = req.body;

    // Basic validation
    if (!location?.district || !soilType || !season || !waterAvailability || !farmSize) {
      return res.status(400).json({
        success: false,
        error:   'district, soilType, season, waterAvailability and farmSize are required',
      });
    }

    // Create the farm document
    const farm = await FarmInput.create({
      user:              req.user.id,
      landName:          landName || 'My Farm',
      location,
      soilType,
      season,
      waterAvailability,
      farmSize,
    });

    // Push reference into User.farms[]
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { farms: farm._id },
    });

    return res.status(201).json({
      success: true,
      message: 'Land information saved successfully',
      farm,
    });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/farm/my-lands  ─────────────────────────────────
// Return all active lands belonging to the logged-in user
async function getMyLands(req, res, next) {
  try {
    const farms = await FarmInput
      .find({ user: req.user.id, isActive: true })
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      count:   farms.length,
      farms,
    });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/farm/:id  ─────────────────────────────────────
// Return a single land parcel (must belong to the logged-in user)
async function getFarmById(req, res, next) {
  try {
    const farm = await FarmInput.findOne({
      _id:    req.params.id,
      user:   req.user.id,
      isActive: true,
    });

    if (!farm) {
      return res.status(404).json({
        success: false,
        error:   'Land not found or does not belong to you',
      });
    }

    return res.json({ success: true, farm });
  } catch (err) {
    next(err);
  }
}

// ── PUT /api/farm/:id  ─────────────────────────────────────
// Update an existing land parcel
async function updateFarm(req, res, next) {
  try {
    const allowed = ['landName', 'location', 'soilType', 'season', 'waterAvailability', 'farmSize'];
    const updates = {};
    allowed.forEach(key => {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    });

    const farm = await FarmInput.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        error:   'Land not found or does not belong to you',
      });
    }

    return res.json({
      success: true,
      message: 'Land information updated',
      farm,
    });
  } catch (err) {
    next(err);
  }
}

// ── DELETE /api/farm/:id  ──────────────────────────────────
// Soft-delete: set isActive = false
async function deleteFarm(req, res, next) {
  try {
    const farm = await FarmInput.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { isActive: false } },
      { new: true }
    );

    if (!farm) {
      return res.status(404).json({
        success: false,
        error:   'Land not found or does not belong to you',
      });
    }

    // Remove from User.farms[]
    await User.findByIdAndUpdate(req.user.id, {
      $pull: { farms: farm._id },
    });

    return res.json({
      success: true,
      message: 'Land removed successfully',
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { createFarm, getMyLands, getFarmById, updateFarm, deleteFarm };
