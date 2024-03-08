const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port =  process.env.PORT || 3001;
const userRoutes = require("./routes/userRoutes");

app.use(cors())

mongoose.connect("mongodb+srv://sachin492002:cp300464@e-commerce.orgsi5l.mongodb.net/?retryWrites=true&w=majority&appName=E-Commerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
    console.log("Connected to database mongodb database");
  });


  mongoose.connection.on("error", (err) => {
    if (err) {
      console.log("Error in database connection: " + err);
    }
  });
  app.use(bodyParser.json());
  app.use('/api',userRoutes);
  app.listen(port, () => {
    console.log("Server started at port: " + port);
  });
  

