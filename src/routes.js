const express = require('express');
const app = express();
//this the main routes, separed any routs for any tipes model, we need use.
app.use('/hits', require('./api/nodejs_list/hits.routes'));
module.exports = app;