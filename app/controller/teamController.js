const Team = require("../models/Team");
const Messages = require("../messages/messages");
const Players = require("../models/Players");

const getAllTeams = async (req, res) => {
           let querString = JSON.stringify(req.query);
    
            querString = querString.replace(
                /\b(gt|gte|lt|lte)\b/g, 
                (match) => `$${match}`
            );
    
            const queryObj = JSON.parse(querString);
    
            let query = Team.find(queryObj)
    
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
                query = query.sort('city');
            }
    
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 7;
            const skip = (page - 1) * limit;
    
            query = query.skip(skip).limit(limit);
    
            const teams = await query;

    res.status(200).json({
        data: teams,
        success: true,
    })
}

const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
            const team = await Team.findById(id).select('-__v').populate("players", "name -_id");
    
            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: Messages.TEAM_NOT_FOUND
                });
            }
    
            res.status(200).json({
                    data: team,
                    success: true,
                    message: `Team Found`
                })
        } catch (err) {
            res.status(404).json({
                success: false,
                message: err.message,
            })
        }
    };
    

const createTeam = async (req, res) => {
    try {
        const newTeam = await Team.create(req.body);

        if (newTeam.players && newTeam.players.length > 0) {
            await Players.updateMany(
                {_id: { $in: newTeam.players } },
                { $set: { team: newTeam._id } }
            );
        }
        res.status(200).json({
            success: true,
            data: newTeam,
            message: Messages.TEAM_CREATED
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        })
    }
};


const updateTeam = async (req, res) => {
    const { id } = req.params;
    try {
        const team = await Team.findByIdAndUpdate(id, req.body, { new: true });

        if (!team) {
            return res.status(404).json({
                success: false,
                message: Messages.TEAM_NOT_FOUND
            })
        }
        res.status(200).json({
            data: team,
            success: true,
            message: Messages.TEAM_UPDATED
        })
    } catch (err){
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
};


const deleteTeam = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTeam = await Team.findByIdAndDelete(id);

        if (!deletedTeam) {
            return res.status(404).json({
                success: false,
                message: Messages.TEAM_NOT_FOUND
            });
        }
    
        res.status(200).json({
        data: deletedTeam,
        success: true,
        message: Messages.TEAM_DELETED
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        })
    }
};

module.exports = {
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
}