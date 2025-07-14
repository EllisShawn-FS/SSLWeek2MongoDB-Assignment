const express = require ("express");
const morgan =require("morgan");
const app = express();
const routeHandler = require("./routes");

app.use(express.json()); // Helps see http methods
app.use(morgan("dev")) // Flags out http calls

app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running", success: true })
});

app.use("/api/v1", routeHandler);

module.exports = app;