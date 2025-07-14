const Players = require("../models/Players")

// GET
const getAllPlayers = async (req, res) => {
    const players = await Players.find({}).populate("team");
    res.status(200).json({
        data: players,
        success: true,
    });
};

const getPlayerById = async (req, res) => {
    const { id } = req.params; 

    try {
        const player = await Players.findById(id);

        if (!player) {
            return res.status(404).json({
                success: false,
                message: "Player not found"
            });
        }

        res.status(200).json({
                data: player,
                success: true,
                message: `Player Found`
            })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
};


// POST 
const createPlayer = async (req, res) => {
    const { player } = req.body;
    const newPlayer = await Players.create(player);
    console.log("data >>>>", newPlayer);
    res.status(200).json({
        success: true,
        message: `Player Created`
    });
};


// PUT 
const updatePlayer = async (req, res) => {
    const { id } = req.params;
    // Arguments Id of what you want to update, what you want to update with, return the new player
    const player = await Players.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({
        data: player,
        success: true,
        message: `Player Updated`
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
                message: "Player not found"
            });
        }
        
            res.status(200).json({
                data: deletedPlayer,
                success: true,
                message: `Player Released`
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