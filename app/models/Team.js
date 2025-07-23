const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  sport: {
    type: String,
    required: true,
    trim: true,
    enum: ["Football"],
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Players",
    },
  ],
});

module.exports = mongoose.model("Team", teamSchema);