const express = require('express');
const {handleGetUser,
    handleGetLogin
} = require('../controller/user.controller')

const router = express.Router();


router.post('/', handleGetUser);
router.get('/login',handleGetLogin);

   
    router.post('/login',handleGetLogin);


module.exports = router;