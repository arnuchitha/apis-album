const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
var cors = require('cors');

var port = process.env.PORT || 7777

app.use(cors()); 
var bodyParser = require('body-parser')
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

require('dotenv').config({path: path.join(__dirname, '.env')});
global.ENV = process.env;
global.PATHIMG = __dirname+'/public/images';
const verify = require('./core/verifyToken');

app.use(express.json());
const pathname = process.env.VERSION;

app.get(pathname+'/', (req, res) => {
    res.send('Welcome to zegotravel apis executive');
});

// const mainRoute = require('./routes/mainRoute');
// const userRoute = require('./routes/userRoute');
// const dataReportRoute = require('./routes/reportRoute');
// const countryRoute = require('./routes/countryRoute');

// app.use(`${pathname}/main`, verify, mainRoute);
// app.use(`${pathname}/user`, verify, userRoute);
// app.use(`${pathname}/country`,verify,countryRoute);
// app.use(`${pathname}/datacrystalreport`,dataReportRoute);

// app.listen(process.env.PORT);

module.exports = app;