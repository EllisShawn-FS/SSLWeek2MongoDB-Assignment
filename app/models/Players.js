// Writing a Schema in Mongoose

const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        unique: true,
    },
    age: {
        type: Number,
        required: true,
    },
    jersey: {
        type: Number,
        required: true,
        unique: true
    },
    position: { 
        type: String,
        required: true
    },
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team"},
});

module.exports = mongoose.model('Players', playersSchema);