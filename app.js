const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const staticRoutes = require('./routes/static');
const bodyParser = require('body-parser');


const staticController = require('./controllers/staticController');
const viewsRoutes = require('./routes/viewsRoutes');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./models/users');
require('dotenv').config();

const app = express();


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
      // Check if the user already exists in your database
      User.findOne({ googleId: profile.id }, (err, existingUser) => {
        if (err) {
          return done(err);
        }

        // If the user already exists, return the user object
        if (existingUser) {
          return done(null, existingUser);
        }

        // If the user doesn't exist, create a new user in your database
        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          // You can save additional user information here
        });

        newUser.save((err) => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      });
    }
  )
);

// Passport.js configuration for Twitter OAuth
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.consumerKey,
      consumerSecret: process.env.consumerSecret,
      callbackURL: 'https://localhost:8080/auth/twitter/callback',
      profileFields: ['id', 'displayName', 'username', 'email', 'photos'],
    },
    (token, tokenSecret, profile, done) => {
      const user = {
        id: profile.id,
        displayName: profile.displayName,
        username: profile.username,
        token: token,
        tokenSecret: tokenSecret,
      };

      return done(null, user);
    }
  )
);

// Serialize and deserialize user objects for session support
passport.serializeUser((user, done) => {
  // Serialize the user object and store it in the session
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Retrieve the user object from the session
  User.findById(id, (err, user) => {
    done(err, user);
  });
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
app.use('/views', viewsRoutes);

// Body-parser and URL encoding middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Handle successful authentication
    res.redirect('/'); // Redirect to the desired page
  }
);

// Other routes
app.use('/', require('./routes'));

module.exports = app;