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
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const folderPathAll = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 5);
                myFolder.push({albumName : a[4]});
            });

            let myFolderValue = _.some(myFolder, {albumName : albumNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/`);
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
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const folderPathAll = glob.sync(`${fromPath}*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 3);
                myFolder.push({countryNameValue : a[2]});
            });

            let myFolderValue = _.some(myFolder, {countryNameValue : countryNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`${fromPath}`);
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
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const folderPathAll = glob.sync(`${fromPath}${countryNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 4);
                myFolder.push({cityName : a[3]});
            });

            let myFolderValue = _.some(myFolder, {cityName : cityNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`${fromPath}${countryNameValue}/`);
                await _fs.mkdir(`${folderPath}${cityNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน

                const folderAuto = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/`);
                if(folderAuto) {
                    await _fs.mkdir(`${folderAuto}สถานที่ท่องเที่ยว`); // สร้างแฟ้มหลักอัตโนมัติ
                    await _fs.mkdir(`${folderAuto}ร้านอาหาร`); // สร้างแฟ้มหลักอัตโนมัติ
                    await _fs.mkdir(`${folderAuto}โรงแรม-ที่พัก`); // สร้างแฟ้มหลักอัตโนมัติ
                }
            }

            
            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    async getFolderAlbum(countryNameValue, cityNameValue) {
        try {
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const myFolder = [];
            const folderName = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 5);
                myFolder.push({albumName : a[4]});
            });
            return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    async getCountryList() {
        try {
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const myCountry = [];
            const folderName = glob.sync(`${fromPath}*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 3);
                myCountry.push({countryName: a[2]});
            });

            return myCountry;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getCountry');
        }

    };
    async getCityList(countryNameValue) {
        try {
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const myCity = [];
            const folderName = glob.sync(`${fromPath}${countryNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 4);
                myCity.push({cityName : a[3]});
            });
            return myCity;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getCity');
        }

    };
    async createAlbumSet(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue) {

        try {
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const folderPathAll = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/${albumNameValue}/*`);
            const myFolder = [];
            folderPathAll.forEach(file => {
                let a = file.split(`/`, 6);
                myFolder.push({albumSetName : a[5]});
            });
            let myFolderValue = _.some(myFolder, {albumSetName : albumSetNameValue})

            if(!myFolderValue){
                const folderPath = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/${albumNameValue}/`);
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
            var fromPath = `${process.env.PATH_CENTER_FILE}`;
            const myFolder = [];
            const folderName = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/${albumNameValue}/*`);
            folderName.forEach(file => {
                let a = file.split(`/`, 6);
                myFolder.push({albumSetName : a[5]});
            });
            return myFolder;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error getFolderAlbum');
        }

    };
    // async getAlbumPhoto(albumNameValue, countryNameValue, cityNameValue, albumSetNameValue) {
    //     try {
    //         var fromPath = `${process.env.PATH_CENTER_FILE}`;
    //         const myFolder = [];
    //         const folderName = glob.sync(`${fromPath}${countryNameValue}/${cityNameValue}/${albumNameValue}/${albumSetNameValue}/*`);
    //         folderName.forEach(file => {
    //             let a = file.split(`/`, 7);
    //             myFolder.push({albumFileName : a[6]});
    //         });
    //         return myFolder;
            
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).send('Error getFolderAlbum');
    //     }

    // };
    
  }
  
  module.exports = Album;