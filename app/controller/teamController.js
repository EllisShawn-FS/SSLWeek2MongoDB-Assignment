const Team = require("../models/Team");
const Messages = require("../messages/messages")

const getAllTeams = async (req, res) => {
    const teams = await Team.find({}).select('-__v');
    res.status(200).json({
        data: teams,
        success: true,
    })
}

const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
            const team = await Team.findById(id).select('-__v');
    
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