/**
 * Created by fuxia on 2017/4/2.
 */
var express = require('express');
var router = express.Router();
var employeeDao =require('../dao/employeeDao');

router.post('/updateInfo_Staff',function (req,res,next) {
    console.log('updateInfo_Staff+++++++++++++++++++++++++++++');
    console.log(req.session.user.username);
    employeeDao.updateByStaffid(req,res,next);
    console.log('updateInfo_Staff+++++++++++++++++++++++++++++');

});

/*
router.get('/updateInfo_Staff',function (req,res,next) {
    res.render('updateemployee');
});
*/


module.exports = router;