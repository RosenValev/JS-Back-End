const express = require('express');
const path = require('path');
const cookieParse = require('cookie-parser');


function ExpressConfig(app) {
    app.use(express.static(path.resolve(__dirname, '../static')));  // Configure static files folder
    app.use(express.urlencoded({ extended: false })); // Middleware body parser -> parse to a Obj the request if we had POST data send from FORM, access it from req.body
    app.use(cookieParse());

}


module.exports = ExpressConfig;