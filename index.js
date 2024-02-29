const https = require('https');
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
var cors = require('cors');
const verify = require('./core/verifyToken');

app.use(cors()); 
var bodyParser = require('body-parser')
app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname+'/public'));
app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine("html",require("ejs").renderFile);

dotenv.config();

require('dotenv').config({path: path.join(__dirname, '.env')});
global.ENV = process.env;
global.PATHIMG = __dirname+'/public/images';


app.use(express.json());

const pathname = process.env.VERSION;
app.get(pathname+'/', (req, res) => {
    res.send('Welcome to zegotravel apis album');
});

const albumRoute = require('./routes/alubumRoute');

app.use(`${pathname}/albumview`,verify,albumRoute);

app.listen(process.env.PORT);







module.exports = app;