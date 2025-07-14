const router = require("express").Router();
const { 
    getAllTeams,
    getTeamById,
    createTeam,
    updateTeam,
    deleteTeam,
} = require("../controller/teamController")

router.get("/", getAllTeams);
router.get("/:id", getTeamById)
router.post("/", createTeam);
router.put("/:id", updateTeam);
router.delete("/:id", deleteTeam);


module.exports = router;