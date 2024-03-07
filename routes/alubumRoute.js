var express = require('express');
var router = express.Router();
var multer = require('multer');
const glob = require('glob');
const path = require('path');
const album = require('../models/album');
var moment = require('moment');

let dynamicDestination = `${process.env.PATH_CENTER_FILE}`; // กำหนดค่าเริ่มต้น
let fileNamelast = "";

router.get(`/`, function (req, res, err) {
    res.status(200).send("this is index");
});

const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, dynamicDestination);
      },
      filename: (req, file, cb) => {

        const uniqueSuffix = `${Math.round(Math.random() * 1E3)}`.toString();
        cb(null, fileNamelast + '-' + moment(moment().toDate()).format('DDMMYY-HHmmss')+ "-" + uniqueSuffix + path.extname(file.originalname));

      }
    })
}).array('fileuploads');

const uploadFileAlbum = () => {
    router.post(`/uploadAlbumSet`, function (req, res, err) {
        upload(req, res, (err) => {
            if (err) {
              return res.status(500).send(err.message);
            }
            res.status(200).send(req.files);
        });
    });
    return true;
};

router.post(`/albumSetForUpload`, function (req, res, err) {
    let data = req.body;
    let file = req.files;
    let albumNameValue = data.albumName;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    let albumSetNameValue = data.albumSetName;
    dynamicDestination = `${process.env.PATH_CENTER_FILE}${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/`;
    fileNamelast = albumSetNameValue;

    uploadFileAlbum()
    
    res.status(200).send(dynamicDestination);
});


router.post('/createFolder', async function (req, res) {

    let data = req.body;
    let albumNameValue = data.albumName;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    
    let ab = new album();
    let result = await ab.createFolder(albumNameValue, countryNameValue, cityNameValue);

    res.status(200).send(result);
});
router.get('/getFolderAlbum', async function (req, res) {

    let query = req.query;
    let countryNameValue = query.countryNameValue;
    let cityNameValue = query.cityNameValue;
    let ab = new album();
    let result = await ab.getFolderAlbum(countryNameValue, cityNameValue);
    res.status(200).send(result);
});
router.get('/getCountryList', async function (req, res) {
    let ab = new album();
    let result = await ab.getCountryList();
    res.status(200).send(result);
});
router.get('/getCityList', async function (req, res) {
    let query = req.query;
    let countryNameValue = query.countryName;
    let ab = new album();
    let result = await ab.getCityList(countryNameValue);
    res.status(200).send(result);
});
router.post('/createAlbumSet', async function (req, res) {

    let data = req.body;
    let albumNameValue = data.albumName;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    let albumSetNameValue = data.albumSetName;
    
    let ab = new album();
    let result = await ab.createAlbumSet(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue);

    res.status(200).send(result);
});
router.get('/getFolderAlbumSet', async function (req, res) {

    let query = req.query;
    let albumNameValue = query.albumName;
    let countryNameValue = query.countryNameValue;
    let cityNameValue = query.cityNameValue;
    let ab = new album();
    let result = await ab.getFolderAlbumSet(albumNameValue,countryNameValue, cityNameValue);
    res.status(200).send(result);
});
router.post('/createFolderCountry', async function (req, res) {
    let data = req.body;
    let countryNameValue = data.countryName;
    
    let ab = new album();
    let result = await ab.createFolderCountry(countryNameValue);

    res.status(200).send(result);
});
router.post('/createFolderCity', async function (req, res) {

    let data = req.body;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    
    let ab = new album();
    let result = await ab.createFolderCity(countryNameValue, cityNameValue);

    res.status(200).send(result);
});
router.get('/getAlbumPhoto', async function (req, res) {

    let query = req.query;
    let albumNameValue = query.albumName;
    let countryNameValue = query.countryNameValue;
    let cityNameValue = query.cityNameValue;
    let albumSetNameValue = query.albumSetNameValue;

    var folderPath = `${process.env.PATH_CENTER_FILE}${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/*`;
    const myFile = [];
    const folderName = glob.sync(`${folderPath}`);
    folderName.forEach(file => {
        let a = file.split(`/`, 7);
        myFile.push({albumFileName : a[6], albumFilePath : file});
    });
    res.status(200).send(myFile)
    // let ab = new album();
    // let result = await ab.getAlbumPhoto(albumNameValue,countryNameValue, cityNameValue, albumSetNameValue);
    // res.status(200).send(true);
});
module.exports = router;
