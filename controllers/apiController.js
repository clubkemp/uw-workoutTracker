//NOTE: Drills are exercises on the frontend

const express = require("express");
const router = express.Router();
const db = require("../models");

// get all workouts
router.get("/api/workouts", (req, res) => {
    db.Workout.find({})
    // populate the associated drill data
    .populate("drill")
    .then(data =>{
        res.json(data)
    })
    .catch(err =>{
        throw err
    })
});
// get drills
router.get("/api/drills", (req, res) => {
    db.Drill.find({}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});
// get drills by id
router.get("/api/drills/:id", (req, res) => {
    db.Drill.findOne({_id:req.params.id}, (err, data) =>{
        if (err) throw err
        res.json(data)
    })
});
// create workouts by name
router.post("/api/create/workout/:name", (req, res) =>{
    db.Workout.create([{name:req.params.name}], (err, data)=>{
        if (err) throw err
        res.json(data)
    })
})


module.exports = router;