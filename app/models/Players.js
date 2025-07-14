// Writing a Schema in Mongoose

const mongoose = require("mongoose");

const playersSchema = new mongoose.Schema({
    name: String,
    age: Number,
    jersey: Number,
    position: String,
    team: { type: mongoose.Schema.Types.ObjectId, ref: "Team"},
});

module.exports = mongoose.model('Players', playersSchema);