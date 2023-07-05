const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.recipe = require('./recipes.js')(mongoose);
db.author = require('./authors.js')(mongoose);
db.user = require('./users.js')(mongoose);

module.exports = db;