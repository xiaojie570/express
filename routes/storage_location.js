/**
 * Created by fuxia on 2017/4/4.
 */
var express = require('express');
var router = express.Router();
var storage_locationDao = require("../dao/storage_locationDao");

router.post('/queryAll',function (req,res,next) {
    storage_locationDao.queryAll(req,res,next);
});
module.exports = router;