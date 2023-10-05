const express = require('express');
const expressConfig = require('./config/expressConfig.js');
const handlebarsConfig = require('./config/handlebarsConfig.js');
const dbConnect = require('./config/dbConfig.js');
const routes = require('./routes.js');

const app = express();
const PORT = 3000;
expressConfig(app);
handlebarsConfig(app);

dbConnect()
    .then(() => console.log('DB connected successfully'))
    .catch(error => console.log('DB error : ', error));

app.use(routes);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));