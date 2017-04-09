/**
 * Created by fuxia on 2017/4/9.
 */
var express = require('express');
var router = express.Router();
var financialDao= require('../dao/financialDao');
router.post('/queryAll',function (req,res,next) {
    financialDao.queryOutAll(req,res,next);
});

module.exports = router;