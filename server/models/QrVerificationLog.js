const mongoose = require("mongoose");

const qrVerificationLogSchema = new mongoose.Schema({
  verifierId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  verifierUsername: String,

  productName: String,
  qrToken: String,
  status: String, // VALID / USED / INVALID

  verifiedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "QrVerificationLog",
  qrVerificationLogSchema
);

