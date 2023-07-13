const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const app = require('./app');
const port = process.env.PORT || 8080;

require('dotenv').config();

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