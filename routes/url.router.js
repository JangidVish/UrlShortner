const express = require('express');
const  {handleGenerateNewShortUrl, handlegetRedirectUrl,handleAnalyticToUrl } = require('../controller/url.controller');
const router = express.Router();

router.post('/', handleGenerateNewShortUrl);
router.get('/:shortId', handlegetRedirectUrl);

    router.get('/analytics/:shortId', handleAnalyticToUrl );

module.exports = router;