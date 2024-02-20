var moment = require("moment");
var _ = require("lodash");
const glob = require('glob');
const _fs = require('fs').promises;
var path = require("path");
const multer = require('multer');

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
        console.log("IN CREATE");
        console.log(albumNameValue, countryNameValue, cityNameValue);

        try {
            const folderPath = glob.sync(`all-album/${countryNameValue}/`);
            console.log(folderPath);

            await _fs.mkdir(`${folderPath[0]}${albumNameValue}`); // สร้างแฟ้มในโฟลเดอร์ปัจจุบัน
            // res.status(201).send(`Directory '${albumNameValue}' created successfully`);

            const folderName = glob.sync(`all-album/${countryNameValue}/*`);
            // folderName.forEach(file => {
            //     console.log(file);
            // });

            return true;
            
        } catch (err) {
            console.error(err);
            res.status(500).send('Error creating directory');
        }

    };
    
  }
  
  module.exports = Album;