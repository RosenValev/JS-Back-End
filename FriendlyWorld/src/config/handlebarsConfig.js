const handlebars = require('express-handlebars');

function handlebarsConfig(app) {
    app.engine('hbs', handlebars.engine({ extname: 'hbs' }));
    app.set('view engine', 'hbs');
    app.set('views', 'src/views'); //setting correct views folder, because it`s nested in src folder, not main folder
}

module.exports = handlebarsConfig;