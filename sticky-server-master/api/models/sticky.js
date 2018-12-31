'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Mongoose schema for sticky object.
 */
let StickySchema = new Schema({

    username: String,

    password: String,

    cart:[]
    
}, {
    versionKey: false
});

module.exports = mongoose.model('Stickies', StickySchema);