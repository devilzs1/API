const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    // we can get the count of clicks by visitHistory.length also so you can remove this as per your requirement
    clicks: {
      type: Number,
      default: 0,
    },
    // if you want to store history(timestamps of visit)
    visitHistory: [{timestamp: {type: Date}}],
  },
  { timestamps: true }
);

const Url = mongoose.model("Url", urlSchema);
module.exports = Url;