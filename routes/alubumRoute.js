var express = require('express');
var router = express.Router();
const album = require('../models/album');
const path = require('path');
const { fstat } = require('fs');
const _fs = require('fs').promises;

router.get('/', async function (req, res) {
    let ab = new album();
    let result = await ab.getTest();
    res.status(200).send(result);
});
// router.get('/dataAlbum', async function (req, res) {
//     let ab = new album();
//     let result = await ab.getTest();
//     res.status(200).sendFile(path.join(__dirname, 'index.html'));
// });
// router.post('/uploadAlbum', upload.single('image'), (req, res) =>{
//     let ab = new album();
//     let result = await ab.uploadfile();
//     res.status(200).send(result);
// });
router.post('/createFolder', async function (req, res) {

    let data = req.body;
    let albumNameValue = data.albumName;
    let countryNameValue = data.countryName;
    let cityNameValue = data.cityName;
    
    let ab = new album();
    let result = await ab.createFolder(albumNameValue, countryNameValue, cityNameValue);
    console.log("1212",result)
    // const directoryName = data.directoryName; // รับชื่อแฟ้มจาก request body
    // console.log(directoryName);
    // try {
    //     await _fs.mkdir(path.join(__dirname, directoryName)); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
    //     res.status(201).send(`Directory '${directoryName}' created successfully`);
    // } catch (err) {
    //     console.error(err);
    //     res.status(500).send('Error creating directory');
    // }

    res.status(200).send(true);
});
module.exports = router;
