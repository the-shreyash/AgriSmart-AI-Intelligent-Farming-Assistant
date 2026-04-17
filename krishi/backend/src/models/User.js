const mongoose = require('mongoose');
const userSchema = new mongoose.Schema(
  {
    name: {
      type:     String,
      required: true,
      trim:     true,
    },
    email: {
      type:      String,
      required:  true,
      unique:    true,
      lowercase: true,
      trim:      true,
    },
    password: {
      type:      String,
      minlength: 6,
      // Not required — Google OAuth users won't have one
    },
    googleId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    provider: {
      type:    String,
      enum:    ['email', 'google'],
      default: 'email',
    },
    role: {
      type:    String,
      enum:    ['farmer', 'admin'],
      default: 'farmer',
    },
    // References to all farm lands this user owns
    farms: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:  'FarmInput',
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', userSchema);