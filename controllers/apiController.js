const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", ({body}, res) => {
    res.render("index")
});


module.exports = router;