const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const staticRoutes = require('./routes/static');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const staticController = require('./controllers/staticController');
const viewsController = require('./controllers/viewsController');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

// Session middleware
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
  })
);

// Initialize Passport.js and session support
app.use(passport.initialize());
app.use(passport.session());

// Passport.js configuration for Google OAuth
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      // You can save the user to your database or perform any other necessary actions
      // The `profile` object contains the user information from Google
      // Call `done` to indicate that the authentication was successful
      done(null, profile);
    }
  )
);

// Passport.js configuration for Twitter OAuth
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: process.env.TWITTER_CALLBACK_URL,
    },
    (token, tokenSecret, profile, done) => {
      // You can save the user to your database or perform any other necessary actions
      // The `profile` object contains the user information from Twitter
      // Call `done` to indicate that the authentication was successful
      done(null, profile);
    }
  )
);

// Serialize and deserialize user objects for session support
passport.serializeUser((user, done) => {
  // Serialize the user object and store it in the session
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // Retrieve the user object from the session
  done(null, user);
});

// View Engine and Templates
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', './layouts/layout');

/* ***********************
 * Routes
 *************************/

// Static Routes
app.use(staticRoutes);

// Index route
app.get('/', staticController.buildHome);
app.get('/views', viewsController.buildRecipeView);

// Body-parser and URL encoding middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Other routes
app.use('/', require('./routes'));

// Connect to MongoDB and start the server
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