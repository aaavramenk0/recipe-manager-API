const express = require('express');
const expressLayouts = require("express-ejs-layouts");
const static = require("./routes/static");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const staticController = require('./controllers/staticController');
const viewsController = require('./controllers/viewsController');

const port = process.env.PORT || 8080;
const app = express();

  //View Engine and Templates
  app.set("view engine", "ejs");

  app.use(expressLayouts);
  app.set("layout", "./layouts/layout"); 
  
  /* ***********************
   * Routes
   *************************/
  
  app.use(static);

  // index route
app.get('/', staticController.buildHome);
app.get('/views', viewsController.buildRecipeView);

app
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));



mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`DB Connected and server running on ${port}.`);
    });
  })
  .catch((err) => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });