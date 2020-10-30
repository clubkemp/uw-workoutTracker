const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/api/workouts", (req, res) => {
    db.Workout.find({}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});
router.get("/api/drills", (req, res) => {
    db.Drill.find({}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});

router.post("/api/create/workout/:name", (req, res) =>{
    db.Workout.create([{name:req.params.name}], (err, data)=>{
        if (err) throw err
        res.json(data)
    })
})


module.exports = router;