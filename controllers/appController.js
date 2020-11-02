const express = require("express");
const router = express.Router();
const db = require("../models");

//Only route for displaying data
router.get("/", (req, res) => {
   // it all starts by finding workouts, these workouts have drill associations
   // we sort by created at so the newest stuff floats to the top
   db. Workout.find({}).sort({createdAt:-1})
   // the magic, we populate the drill reference with the drill documents
   .populate("drill")
   .then(data =>{
      // JSONIFY the data restuls
      const JSONdata = data.map(e=>{
         return e.toJSON()
      })
      // setup that data to pass into handlebars
      const hbsObj = {
         workout: JSONdata
      }
      // render the index page with our array of workouts (with drills inside each workout)
      res.render("index", hbsObj)
   })
   .catch(err =>{
      res.status(500).send(err)
   })
});

// creating a workout
router.post("/createworkout", (req, res) =>{
   // setup the wokrout id in the function scope to reference further down
   let workoutId
   // create the workout with the req.body (just a name)
   db.Workout.create([req.body])
   .then(workout =>{
      // set thew workout id from the result so we can use later 
      workoutId = workout[0]._id
      // create a template starter drill to go inside the workout
      db.Drill.create({
         name: "My first Exercise",
         type: "Warmup",
         location: "Wherever",
         duration: 5,
         description:"You got this! Runners lunge 60seconds on each side. Follow with 2 minutes of sun-salutations. Finish with 1 minute jumping jacksThis is your first exercise in your workout. Not feeling the warmup, that's fine use this card as a template to start building your very own exercises",
         tags:["warmup", "yoga", "feel-good"]
       })
       .then(drill =>{
         // now take the drill we just made, and instantly associate it with our workoutId
         db.Workout.findByIdAndUpdate(workoutId, { $push: { drill: drill._id } }, { new: true })
         .then((result =>{
            res.status(200).send("Workout created")
         }))
         
      })
   })
   .catch(err =>{
      res.status(500).send(err)
   })
})

// update a drill
router.put("/updatedrill",(req,res) =>{
   const drillData = req.body.data
   const drillId = req.body.drillId
   console.log(req.body)
   console.log(drillData);
   console.log(drillId)
   db.Drill.findByIdAndUpdate(drillId, drillData,{new:true})
   .then((result =>{
      res.status(200).send("exercise updated")
   }))
})

router.post("/createdrill", (req, res) =>{
   const drillData = req.body.data
   const workoutId = req.body.workoutId
   db.Drill.create(drillData)
    .then(drill =>{
      db.Workout.findByIdAndUpdate(workoutId, { $push: { drill: drill._id } }, { new: true })
      .then((result =>{
         res.status(200).send("exercise created")
      }))
      
   })
   .catch(err =>{
      res.status(500).send(err)
   })
})

router.delete("/deletedrill/:id", (req,res) =>{
   console.log(req.params.id)
   db.Drill.findByIdAndDelete(req.params.id)
   .then((result =>{
      res.status(200).send("exercise delete")
   }))
   .catch(err =>{
      res.status(500).send(err)
   })
})

router.delete("/deleteworkout/:id", (req,res) =>{
   console.log(req.params.id)
   db.Workout.findByIdAndDelete(req.params.id)
   .then((result =>{
      res.status(200).send("workout delete")
   }))
   .catch(err =>{
      res.status(500).send(err)
   })
})



module.exports = router;