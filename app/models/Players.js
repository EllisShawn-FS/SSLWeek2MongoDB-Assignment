// Writing a Schema in Mongoose

const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 45,
    },
    jersey: {
        type: Number,
        required: true,
        unique: true,
        min: 0,
        max: 99,
    },
    position: { 
        type: String,
        required: true,
        enum: [
            "Quarterback", "Runningback", "Fullback",
            "Widereceiver", "Tight End", "Left Tackle", "Right Tackle", "Left Guard", "Right Guard", "Center", "Defensive Tackle", "Defensive End", "Linebacker", "Outside Linebacker", "Middle Linebacker", "Cornerback", "Safety", "Free Safety", "Strong Safety", "Kicker", "Punter", "Kick Returner", "Punt Returner", "Long Snapper"
        ]
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team"},
});

module.exports = mongoose.model('Players', playersSchema);