const Team = require("../models/Team")

const getAllTeams = async (req, res) => {
    const teams = await Team.find({});
    res.status(200).json({
        data: teams,
        success: true,
    })
}

const getTeamById = async (req, res) => {
    const { id } = req.params;

    try {
            const team = await Team.findById(id);
    
            if (!team) {
                return res.status(404).json({
                    success: false,
                    message: "Team not found"
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
            message: "Team created"
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
                message: "Team not found",
            })
        }
        res.status(200).json({
            data: team,
            success: true,
            message: `Team Updated`
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
                message: "Team not found"
            });
        }
    
        res.status(200).json({
        data: deletedTeam,
        success: true,
        message: `Team Deleted`
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