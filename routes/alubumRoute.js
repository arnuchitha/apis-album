var express = require('express');
var router = express.Router();
var multer = require('multer');
const glob = require('glob');
const album = require('../models/album');
const path = require('path');
const { fstat } = require('fs');
const _fs = require('fs').promises;


router.get(`/`, function (req, res, err) {
    res.status(200).send("this is index");
});

const uploadFileAlbum = (albumNameValue, countryNameValue, cityNameValue, albumSetNameValue) => {

    var folderPath = `${process.env.PATH_CENTER_FILE}/${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/`;
    var storage = multer.diskStorage({
        destination: function (request, file, callback) {
            //ปรับเป็น file .env ในภายหลังนะครับ
            callback(null, folderPath);
        },
        filename: function (request, file, callback) {
            // กำหนดชื่อไฟล์มาเป็น originalname เลย
            callback(null, file.originalname);
        }
    });

    var upload = multer({ storage: storage });

    router.post(`/uploadAlbumSet`, upload.array('fileuploads'), function (req, res, err) {
        res.status(200).send(req.files);
    });

};

router.post(`/albumSetForUpload`, function (req, res, err) {
    let data = req.body;
    let file = req.files;
    let albumNameValue = data.albumName;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    let albumSetNameValue = data.albumSetName;
    let fileAlbum = data.fileAlbum;
    let fileUpload = req.files;

    let result = uploadFileAlbum(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue)

    // let ab = new album();

    // let result = ab.uploadAlbumSet(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue, fileAlbum, fileUpload);
    
    res.status(200).send(result);
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

    var folderPath = `${process.env.PATH_CENTER_FILE}/${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/*.{jpg,png,gif}`;
   
    const myFile = [];
    const folderName = glob.sync(`${folderPath}`);
    folderName.forEach(file => {
        let a = file.split(`/`, 7);
        myFile.push({albumFileName : a[6]});
    });
    res.status(200).send(myFile)

    // let ab = new album();
    // let result = await ab.getAlbumPhoto(albumNameValue,countryNameValue, cityNameValue, albumSetNameValue);
    // res.status(200).send(true);
});
module.exports = router;
