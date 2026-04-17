
const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    // Owner
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true,
    },

    // Which land this recommendation was generated for
    farmInput: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'FarmInput',
      required: true,
    },

    
    weather: {
      temperature: Number,
      humidity:    Number,
      rainfall:    Number,
      windSpeed:   Number,
      condition:   String,
      icon:        String,
      isFallback:  { type: Boolean, default: false },
    },

    
    crops: [
      {
        name:             String,
        nameHindi:        String,
        suitabilityScore: { type: Number, min: 0, max: 100 },
        estimatedYield:   String,
        growingDuration:  String,
        waterRequirement: String,
        profitPotential:  String,
        whyRecommended:   String,
        risks:            String,
        mandiPrice: {
          price:     Number,
          unit:      String,
          trend:     String,
          updatedAt: String,
        },
      },
    ],

    
    farmingCalendar: [
      {
        month:    String,
        activity: String,
        icon:     String,
      },
    ],

    // ── Actionable farming advice ────────────────────────────
    farmingAdvice: {
      soilPreparation:    String,
      irrigation:         String,
      fertilizerSchedule: String,
      pestManagement:     String,
    },

    // ── Government schemes relevant to the farmer ────────────
    governmentSchemes: [
      {
        name:    String,
        benefit: String,
        link:    String,
      },
    ],

    // ── Financial estimates ──────────────────────────────────
    estimatedRevenue: {
      type: String, // e.g. "₹45,000 – ₹60,000 per acre"
    },

    bankLoanAdvice: {
      type: String, // KCC / Kisan Credit Card guidance
    },

    weatherAlert: {
      type: String,
    },

    // ── AI-generated summary (Hindi / Hinglish) ──────────────
    aiSummary: {
      type:     String,
      required: true,
    },

    // ── Bonus fields (placeholders for future integrations) ──
    voiceUrl: {
      type: String,
      default: null,
    },
    pdfUrl: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Index for fast "latest" and "history" queries
recommendationSchema.index({ user: 1, createdAt: -1 });
recommendationSchema.index({ farmInput: 1, createdAt: -1 });

module.exports =
  mongoose.models.Recommendation ||
  mongoose.model('Recommendation', recommendationSchema);
