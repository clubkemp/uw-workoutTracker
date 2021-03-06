const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  name: {
    type: String,
    unique: true
  },
  drill:[
    {
      type: Schema.Types.ObjectId,
      ref: "Drill"
    }
  ],
  
},
{
  timestamps: true 
}
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
