var moment = require("moment");
var _ = require("lodash");
const glob = require('glob');
const _fs = require('fs').promises;
// const jsfiles = glob.sync('**/*.js', { ignore: 'node_modules/**' })
// // const _db = require("../core/crudMysql");

// const stopAfter100ms = glob('**/*.css', {
//     signal: AbortSignal.timeout(100),
// })

// const images = glob.sync(['css/*.{png,jpeg}', 'public/*.{png,jpeg}'])


// ใช้ glob() เพื่อค้นหาไฟล์ที่ตรงกับรูปแบบที่กำหนด
// glob('*.js', function (err, files) {
//   if (err) {
//     console.error(err);
//   } else {
//     console.log(files);
//   }
// });

// หรือใช้ glob.sync() เพื่อค้นหาไฟล์ที่ตรงกับรูปแบบที่กำหนด โดยไม่ใช้ callback
const files = glob.sync('*.js');
console.log(files);

class Album {
    constructor() {}
    // async checkFolderMantenance(){
    //     let isProblemFileSrcIn = isProblem.filter(o=>o==false).length==0; 
    //     //check warnning path Maintenance
    //     let localPath  =`${process.cwd()}`;
    //     let isNotProblemWorkDone = await validPath(path.join(localPath,'\\workdone'));
    //     isProblemAll.push(isNotProblemWorkDone);
    
    //     //มี Folder  workdone ให้ทำงานเสมอ
    //     // เช็คที่อยู่ Workdone มีมั้ย เช็คที่อยู่แฟ้ม Maintenance ที่จะเก็บมีมั้ย เช็คชื่อไฟล์ที่เก็บถูกต้องมั้ย
    //     if (isNotProblemWorkDone && isProblemSrcIn && isProblemFileSrcIn) {
    //         let isProblemDesIn = await validPath(`${localPath}${cnf.desIn}`);
    //         if (!isProblemDesIn) {
    //             await _fs.mkdir(`${localPath}${cnf.desIn}`).catch((error)=>{
    //                 isProblemAll.push(false);
    //                 _elog.winston().warn({event:"DIRECTORY",process:"MN-APMAS",message:`Found Problem Code: ${error.code} ${localPath}${cnf.desIn}`,data:{}});  
    //                 return false              
    //             });
    
    //         }
    //     }
    //     isProblemAll.push(isProblemSrcIn,isProblemFileSrcIn);
    //     await timeout(500);
    //     return isProblemAll.filter((o)=>{ return o==false}).length==0
    // }

    async getTest() {
        const jsfiles = glob.sync('**/*.js', { ignore: 'node_modules/**' })
        console.log("TEST", jsfiles);
    }
  }
  
  module.exports = Album;