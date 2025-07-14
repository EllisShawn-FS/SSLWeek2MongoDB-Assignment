const express = require("express");
const router = express.Router();

const playerRoutes = require("./playerRoutes");
const teamRoutes = require("./teamRoutes");

router.get("/", (req, res) => {
    res.status(200).json({ success: true, message: `${req.method} - Request made`})
})

router.use("/players", playerRoutes);
router.use("/teams", teamRoutes);

module.exports = router;