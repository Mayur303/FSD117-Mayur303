const mongoose = require("mongoose");

const qrGenerationLogSchema = new mongoose.Schema({
  vendorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendorUsername: String,

  productName: String,
  batchNumber: String,
  qrToken: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "QrGenerationLog",
  qrGenerationLogSchema
);

