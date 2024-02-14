var express = require('express');
var router = express.Router();
// const album = require('../models/album');

router.get('/', async function (req, res) {
    console.log("TEST11")
    // let ab = new album();
    // let result = await ab.getTest();
    res.status(200).send("IN");
});


module.exports = router;
