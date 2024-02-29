var moment = require("moment");
var _ = require("lodash");
const glob = require('glob');
const _fs = require('fs').promises;
var path = require("path");
const multer = require('multer');
const fsExtra = require('fs-extra');
const { set } = require("lodash");

class Album {
    constructor() {}

    async uploadfile () {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
              cb(null, 'japan/'); // กำหนดให้เก็บไฟล์ในโฟลเดอร์ uploads
            },
            filename: (req, file, cb) => {
              cb(null, `${Date.now()}${path.extname(file.originalname)}`); // กำหนดชื่อไฟล์ให้ไม่ซ้ำกัน
            }
        });
    
        const upload = multer({ storage });
    };

    async createFolder(albumNameValue, countryNameValue, cityNameValue) {

        try {

            const folderPathAll = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 4);
                myFolder.push({albumName : a[3]});
            });

            let myFolderValue = _.some(myFolder, {albumName : albumNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/`);
            await _fs.mkdir(`${folderPath[0]}${albumNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
            }    

            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    async createFolderCountry(countryNameValue) {

        try {

            const folderPathAll = glob.sync(`all-album/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 2);
                myFolder.push({countryNameValue : a[1]});
            });

            let myFolderValue = _.some(myFolder, {countryNameValue : countryNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`all-album/`);
                await _fs.mkdir(`${folderPath}${countryNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
            }

            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    async createFolderCity(countryNameValue, cityNameValue) {

        try {

            const folderPathAll = glob.sync(`all-album/${countryNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 3);
                myFolder.push({cityName : a[2]});
            });

            let myFolderValue = _.some(myFolder, {cityName : cityNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`all-album/${countryNameValue}/`);
                await _fs.mkdir(`${folderPath}${cityNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
            }

            
            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    async getFolderAlbum(countryNameValue, cityNameValue) {
        try {
            const myFolder = [];
            const folderName = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 4);
                myFolder.push({albumName : a[3]});
            });
            return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    async getCountryList() {
        try {
            const myCountry = [];
            const folderName = glob.sync(`all-album/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 2);
                myCountry.push({countryName: a[1]});
            });
            return myCountry;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getCountry');
        }

    };
    async getCityList(countryNameValue) {
        try {

            const myCity = [];
            const folderName = glob.sync(`all-album/${countryNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 3);
                myCity.push({cityName : a[2]});
            });
            return myCity;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getCity');
        }

    };
    async createAlbumSet(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue) {

        try {

            const folderPathAll = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/${albumNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 5);
                myFolder.push({albumSetName : a[4]});
            });
            let myFolderValue = _.some(myFolder, {albumSetName : albumSetNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/${albumNameValue}/`);
                await _fs.mkdir(`${folderPath[0]}${albumSetNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
            }    

            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    async getFolderAlbumSet(albumNameValue, countryNameValue, cityNameValue) {
        try {
            const myFolder = [];
            const folderName = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/${albumNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 5);
                myFolder.push({albumSetName : a[4]});
            });
            return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    uploadAlbumSet(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue, fileAlbum) {
        try {

            console.log(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue, fileAlbum);
            // const storage = multer.diskStorage({
            //     destination: function (req, file, cb) {
            //         cb(null, 'uploads/');
            //     },
            //     filename: function (req, file, cb) {
            //         cb(null, file.fieldname + '-' + Date.now());
            //     },
            // });

            // const upload = multer({ storage: storage });

            // // ใช้ glob เพื่อรวบรวมไฟล์ทั้งหมดในโฟลเดอร์ uploads
            // glob('uploads/*', (err, files) => {
            //     if (err) {
            //     console.error(err);
            //     return;
            //     }
            
            //     // ใช้ Multer middleware ในการจัดการอัปโหลดไฟล์
            //     app.post('/upload', upload.array('myFiles', files.length), (req, res, next) => {
            //     // req.files เก็บข้อมูลของไฟล์ที่อัปโหลด
            //     res.send('Files uploaded successfully!');
            //     });
            // });

            // const myFolder = [];
            // const folderName = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/${albumNameValue}/*`);
            // folderName.forEach(file => {
            //     let a = file.split(`/`, 5);
            //     myFolder.push({albumSetName : a[4]});
            // });
            // return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    async getAlbumPhoto(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue) {
        try {
            const myFolder = [];
            const folderName = glob.sync(`all-album/${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 6);
                myFolder.push({albumFileName : a[5]});
            });
            return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    
  }
  
  module.exports = Album;