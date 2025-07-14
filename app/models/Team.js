const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    name: String,
    sport: String,
    city: String,
})

module.exports = mongoose.model('Team', teamSchema)