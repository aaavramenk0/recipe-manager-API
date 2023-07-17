const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const staticRoutes = require('./routes/static');
const bodyParser = require('body-parser');

const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const staticController = require('./controllers/staticController');
const viewsRoutes = require('./routes/viewsRoutes');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('./models/users');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const app = express();

// Oauth code
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
};
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

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
      scope: ['profile', 'email'],
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
      callbackURL: 'https://recipe-manager-api.onrender.com/auth/twitter/callback',
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
// graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

// Body-parser and URL encoding middleware

app
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'));

// Google OAuth login route
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

//  Google OAuth callback route
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Handle successful authentication
    res.redirect('/'); // Redirect to the desired page
  }
);

// Twitter OAuth login route
app.get('/auth/twitter', passport.authenticate('twitter'));

// Twitter OAuth callback route
app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  (req, res) => {
    // Handle successful authentication
    res.redirect('/'); // Redirect to the desired page
  }
);
/*app.get('/auth/google', (req, res, next) => {
  passport.authenticate('google', { scope: ['profile', 'email'] }, (err, user, info) => {
    // Log the authentication request details
    console.log('Authentication request:', info);

    // Call the default Passport.js handler
    next();
  })(req, res, next);
});*/
// Other routes
app.use('/', require('./routes'));
app.use('/user', require('./routes/signup')) 
app.use('/user', require('./routes/login'))

module.exports = app;