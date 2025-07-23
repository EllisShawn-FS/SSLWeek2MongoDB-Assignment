const Players = require("../models/Players")
const Team = require("../models/Team")
const Messages = require("../messages/messages")

// GET
const getAllPlayers = async (req, res) => {
    try {
        let querString = JSON.stringify(req.query);

        querString = querString.replace(
            /\b(gt|gte|lt|lte)\b/g, 
            (match) => `$${match}`
        );

        const queryObj = JSON.parse(querString);

        let query = Players.find(queryObj)

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        } else {
            query = query.select('-__v');
        }

        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('age');
        }

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 7;
        const skip = (page - 1) * limit;

        query = query.skip(skip).limit(limit);

        const players = await query;

        res.status(200).json({
            success: true,
            data: players,
        });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

const getPlayerById = async (req, res) => {
    const { id } = req.params;

    try {
        const player = await Players.findById(id)
            .select('-__v')
            .populate("team", "name -_id");

        if (!player) {
            return res.status(404).json({
                success: false,
                message: Messages.PLAYER_NOT_FOUND
            });
        }

        res.status(200).json({
            data: player,
            success: true,
            message: `Player Found`
        });
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
};


// POST 
const createPlayer = async (req, res) => {
    try {
        const newPlayer = await Players.create(req.body);
        

        if (newPlayer.team) {
            await Team.findByIdAndUpdate(
                newPlayer.team,
                { $push: { players: newPlayer._id } },
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            data: newPlayer,
            message: Messages.PLAYER_CREATED
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
};


// PUT 
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    // Arguments Id of what you want to update, what you want to update with, return the new player
    const player = await Players.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        data: player,
        success: true,
        message: Messages.PLAYER_UPDATED
    })
};


// DELETE 
const deletePlayer = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPlayer = await Players.findByIdAndDelete(id);
    
        if (!deletedPlayer) {
            return res.status(404).json({
                success: false,
                message: Messages.PLAYER_NOT_FOUND
            });
        }
        
            res.status(200).json({
                data: deletedPlayer,
                success: true,
                message: Messages.PLAYER_DELETED
            })
    } catch (err) {
            res.status(404).json({
                success: false,
                message: err.message,
            })
        }
    };

module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer
}