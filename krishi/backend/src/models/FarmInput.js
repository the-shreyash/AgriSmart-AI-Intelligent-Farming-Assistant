
import mongoose from'mongoose';

const farmInputSchema = new mongoose.Schema(
  {
    // Owner of this land
    user: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      'User',
      required: true,
      index:    true,
    },

    // Optional friendly name for this land parcel
    landName: {
      type:    String,
      trim:    true,
      default: 'My Farm',
    },

    // Geographic location
    location: {
      district: { type: String, required: true, trim: true },
      state:    { type: String, trim: true },
      country:  { type: String, trim: true, default: 'India' },
    },

    // Soil characteristics
    soilType: {
      type:     String,
      enum:     ['clay', 'sandy', 'loamy', 'black', 'red', 'alluvial'],
      required: true,
    },

    // Farming season
    season: {
      type:     String,
      enum:     ['kharif', 'rabi', 'zaid'],
      required: true,
    },

    // Water / irrigation availability
    waterAvailability: {
      type:     String,
      enum:     ['low', 'medium', 'high'],
      required: true,
    },

    // Total farm area in acres
    farmSize: {
      type:     Number,
      required: true,
      min:      [0.1, 'Farm size must be at least 0.1 acres'],
    },

    // Soft-delete / active toggle
    isActive: {
      type:    Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Compound index: quickly fetch all active farms for a user
farmInputSchema.index({ user: 1, isActive: 1 });
export default   mongoose.models.FarmInput || mongoose.model('FarmInput', farmInputSchema);
