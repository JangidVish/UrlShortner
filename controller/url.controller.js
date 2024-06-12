const URL = require('../models/url');
const shortid = require('shortid');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).render('home');

    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render('home', {
        id: shortID
    });
}

async function handlegetRedirectUrl(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                },
            },
        },
        { new: true }
    );

    if (!entry) {
        return res.status(404).send('Short URL not found');
    }

    console.log(entry);
    return res.redirect(entry.redirectUrl);
}

async function handleAnalyticToUrl(req, res) {
    const shortId = req.params.shortId;
    const events = await URL.findOne({ shortId });
    const clicks = events.visitHistory.length;

    return res.json({
        totalClicks: clicks,
        analytics: events.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortUrl,
    handlegetRedirectUrl,
    handleAnalyticToUrl
};
