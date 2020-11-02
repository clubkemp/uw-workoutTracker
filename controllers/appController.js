const express = require("express");
const router = express.Router();
const db = require("../models");


router.get("/", (req, res) => {
   db. Workout.find({})
   .populate("drill")
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
         name: "My first Exercise",
         type: "Warmup",
         location: "Wherever",
         duration: 5,
         description:"You got this! Runners lunge 60seconds on each side. Follow with 2 minutes of sun-salutations. Finish with 1 minute jumping jacksThis is your first exercise in your workout. Not feeling the warmup, that's fine use this card as a template to start building your very own exercises",
         tags:["warmup", "yoga", "feel-good"]
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