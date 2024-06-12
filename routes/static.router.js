const express = require('express');
const URL = require('../models/url');
const { restrictToRole } = require('../middlewares/auth.middleware');
const router = express.Router();

router.get('/admin/urls', restrictToRole(["ADMIN"]), async (req,res)=>{
    const allurls = await URL.find({});
    return res.render("home", {
        urls: allurls,

    })
})

router.get('/',restrictToRole("NORMAL","ADMIN"), async (req, res)=>{
    // if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({createdBy: req.user._id});
    res.render('home',{
        urls: allurls,
    }
    );
})

router.get('/signup', async(req,res)=>{
     res.render('signup');
 })

 router.get('/login', async(req,res)=>{
    res.render('login');
})

module.exports = router;