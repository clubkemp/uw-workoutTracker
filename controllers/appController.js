const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
   db. Workout.find({})
   .then(data =>{
      const JSONdata = data.map(e=>{
         return e.toJSON()
      })
      const hbsObj = {
         workout: JSONdata
      }
      res.render("index", hbsObj)
   })
   .catch(err =>{
      res.status(500).send(err)
   })
});

router.post("/createworkout", async (req, res) =>{
   let workoutId
   db.Workout.create([req.body])
   .then(workout =>{
      workoutId = workout[0]._id
      console.log(`workoutid ${workoutId}`)
      db.Drill.create({
         name: "exercise name?",
         type: "what are you doing?",
         location: "place of exercise?",
         duration: "in hrs?",
         weight: 0,
         sets: 0,
         reps: 0,
         distance:0
       })
       .then(drill =>{
         console.log(`${drill._id}`)
         db.Workout.findByIdAndUpdate(workoutId, { $push: { drill: drill._id } }, { new: true })
         .then((result =>{
            console.log(result)
         }))
         res.status(200).send("Workout created")
      })
   })
   .catch(err =>{
      res.status(500).send(err)
   })
})


module.exports = router;