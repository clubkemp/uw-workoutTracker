const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/workouts", (req, res) => {
    db.Workout.find({}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});

router.get("/drills", (req, res) => {
    db.Drill.find({}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});


module.exports = router;