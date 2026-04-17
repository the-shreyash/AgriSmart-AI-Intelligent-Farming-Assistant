// ============================================================
//  src/controllers/recommendationController.js
//  Orchestrates: validate → weather → AI → mandi → save → respond
// ============================================================
const { fetchWeather }            = require('../services/weatherService');
const { generateRecommendations } = require('../services/geminiService');
const { enrichWithMandiPrices }   = require('../services/mandiService');
const { validateRecommendRequest } = require('../utils/validators');
const FarmInput      = require('../models/FarmInput');
const Recommendation = require('../models/Recommendation');

// ── POST /api/recommendation/generate ────────────────────────
async function generate(req, res, next) {
  try {
    // 1. Validate input ───────────────────────────────────────
    const { error, value } = validateRecommendRequest(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        error:   'Validation failed',
        details: error.details.map(d => d.message),
      });
    }

    const {
      location,
      soilType,
      season,
      waterAvailability,
      farmSize,
      language,
      farmInputId,   // optional: link to a saved land
    } = value;

    // 2. Fetch weather ─────────────────────────────────────────
    const weather = await fetchWeather(location);

    // 3. Run AI recommendation engine ──────────────────────────
    const aiData = await generateRecommendations({
      location,
      soilType,
      season,
      waterAvailability,
      farmSize,
      language,
      weather,
    });

    // 4. Enrich top crops with mandi price data ─────────────────
    if (Array.isArray(aiData.topCrops)) {
      aiData.topCrops = enrichWithMandiPrices(aiData.topCrops);
    }

    // 5. Optionally resolve which FarmInput to link ─────────────
    let farmInputRef = farmInputId || null;

    // If no farmInputId supplied but user is authenticated,
    // auto-save a FarmInput and link it
    if (!farmInputRef && req.user) {
      try {
        const loc = typeof location === 'string'
          ? { district: location }
          : location;

        const newFarm = await FarmInput.create({
          user:              req.user.id,
          landName:          `${loc.district || location} Farm`,
          location:          loc,
          soilType,
          season,
          waterAvailability,
          farmSize: farmSize || 1,
        });

        const User = require('../models/User');
        await User.findByIdAndUpdate(req.user.id, {
          $addToSet: { farms: newFarm._id },
        });

        farmInputRef = newFarm._id;
      } catch (_) {
        // Non-critical — proceed without linking
      }
    }

    // 6. Persist the recommendation if user is authenticated ────
    let savedRec = null;
    if (req.user && farmInputRef) {
      savedRec = await Recommendation.create({
        user:      req.user.id,
        farmInput: farmInputRef,
        weather: {
          temperature: weather.temperature,
          humidity:    weather.humidity,
          rainfall:    weather.rainfall,
          windSpeed:   weather.windSpeed,
          condition:   weather.description,
          icon:        weather.icon,
          isFallback:  weather.isFallback,
        },
        crops:             aiData.topCrops      || [],
        farmingCalendar:   aiData.farmingCalendar || [],
        farmingAdvice: {
          soilPreparation:    aiData.soilPreparation    || '',
          irrigation:         aiData.irrigationAdvice   || '',
          fertilizerSchedule: aiData.fertilizerSchedule || '',
          pestManagement:     aiData.pestManagement      || '',
        },
        governmentSchemes: aiData.governmentSchemes || [],
        estimatedRevenue:  aiData.expectedRevenue   || '',
        bankLoanAdvice:    aiData.bankLoanAdvice     || '',
        weatherAlert:      aiData.weatherAlert       || '',
        aiSummary:         aiData.aiSummary || aiData.summary || 'AI summary not available',
        voiceUrl:          null,   // placeholder
        pdfUrl:            null,   // placeholder
      });
    }

    // 7. Build and send response ─────────────────────────────────
    return res.json({
      success:         true,
      generatedAt:     new Date().toISOString(),
      recommendationId: savedRec?._id || null,
      inputData: { location, soilType, season, waterAvailability, farmSize, language },
      weather,
      recommendations: aiData,
      voiceUrl:        null,   // placeholder for TTS integration
      pdfUrl:          null,   // placeholder for PDF export
    });

  } catch (err) {
    next(err);
  }
}

// ── GET /api/recommendation/latest ───────────────────────────
// Returns the most recent saved recommendation for the user
async function getLatest(req, res, next) {
  try {
    const rec = await Recommendation
      .findOne({ user: req.user.id })
      .sort({ createdAt: -1 })
      .populate('farmInput', 'landName location soilType season farmSize');

    if (!rec) {
      return res.status(404).json({
        success: false,
        error:   'No recommendations found yet',
      });
    }

    return res.json({ success: true, recommendation: rec });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/recommendation/history ──────────────────────────
// Returns all past recommendations for the user (paginated)
async function getHistory(req, res, next) {
  try {
    const page  = Math.max(parseInt(req.query.page)  || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 50);
    const skip  = (page - 1) * limit;

    const [recommendations, total] = await Promise.all([
      Recommendation
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('farmInput', 'landName location soilType season farmSize'),
      Recommendation.countDocuments({ user: req.user.id }),
    ]);

    return res.json({
      success: true,
      total,
      page,
      pages: Math.ceil(total / limit),
      recommendations,
    });
  } catch (err) {
    next(err);
  }
}

// ── GET /api/recommendation/:id ───────────────────────────────
// Returns a single recommendation by ID (scoped to user)
async function getById(req, res, next) {
  try {
    const rec = await Recommendation
      .findOne({ _id: req.params.id, user: req.user.id })
      .populate('farmInput', 'landName location soilType season waterAvailability farmSize');

    if (!rec) {
      return res.status(404).json({
        success: false,
        error:   'Recommendation not found',
      });
    }

    return res.json({ success: true, recommendation: rec });
  } catch (err) {
    next(err);
  }
}

module.exports = { generate, getLatest, getHistory, getById };
