// require in our libs
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
// set our port
const PORT = process.env.PORT || 4000;


// instantiate express
const app = express();
// app use variables
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// connect to mongoose
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout-tracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false 
  }
);

//controller routes
const apiRoutes = require('./controllers/apiController.js')
app.use(apiRoutes)
const appRoutes = require('./controllers/appController.js')
app.use(appRoutes)

//handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main", }));
app.set("view engine", "handlebars");

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});