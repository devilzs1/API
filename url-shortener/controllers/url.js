const { ViewModuleSharp } = require('@material-ui/icons');
const Url = require('../models/url');
const UrlShortener = require('../utils/urlShortener');

class UrlController{
    static async shortUrl(req, res){
        try{
            const {originalUrl} = req.body;
            if(!originalUrl){
                return res.status(400).json({message: "URL is required"});
            }

            let url = await Url.findOne({originalUrl});
            if(url){
                return res.status(200).json(url);
            }

            const shortUrl = UrlShortener.generateShortUrl();

            url = new Url({
                originalUrl, shortUrl
            });
            await url.save();
            res.status(200).json(url);

        }catch(err){
            res.status(500).json({message: "Server error: " + "Please try again after some time!" +  err.message});
        }
    }

    static async redirectUrl(req, res){
        try {
            const {shortUrl} = req.params;
            const url = await Url.findOneAndUpdate(
              { shortUrl },
              {
                $inc: { clicks: 1 },
                $push: { visitHistory: { timestamp: Date.now() } },
              },
              { new: true }
            );

            if (!url) {
              return res.status(404).send("URL not found!");
            }

            res.redirect(url.originalUrl);

        } catch (err) {
            res
              .status(500)
              .json({
                message:
                  "Server error: " +
                  "Please try again after some time!" +
                  err.message,
              });
        }
    }

    static async getAnalytics(req, res){
        try{
            const {shortUrl} = req.params;
            // const shortUrl = req.params.shortUrl;
            const result = await Url.findOne({shortUrl});

            return res.status(200).json({
                // totalClicks: result.clicks,
                totalClicks: result.visitHistory.length,
                analytics: result.visitHistory
            })
        }catch(err){
            res.status(500).json({
            message: "Server error: " + "Please try again after some time!" + err.message,
            });
        }
    }
}

module.exports = UrlController;