'use strict';
module.exports = function (app) {
    //Initialize models
    let stickyModel = require('./models/sticky');
    let userModel = require('./models/user');

    //Initialize routes
    let stickyRoutes = require('./routes/sticky-route');
    //let userRoutes = require('./routes/user-route');
    stickyRoutes(app);
};