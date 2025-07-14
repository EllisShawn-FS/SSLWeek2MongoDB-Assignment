const router = require("express").Router();
const { 
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer 
} = require("../controller/playerController")


router.get("/", getAllPlayers);
router.get("/:id", getPlayerById)
router.post("/", createPlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);


module.exports = router;
