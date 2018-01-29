const mongoose = require('mongoose');
const shortid  = require('shortid');
mongoose.Promise = global.Promise;

const shortUrlSchema = new mongoose.Schema({
    "original_url": String,
    "short_url": String,
},{ "timestamps": true });


const ShortUrl = mongoose.model('shortUrlSchema', shortUrlSchema, 'urls');

ShortUrl.getShortUrls = (callback, limit) => {
    ShortUrl.find(callback).limit(limit)
};

ShortUrl.isDuplicate = (id, callback, limit) => {
    ShortUrl.find({ original_url: id }).distinct('original_url', callback);
};

ShortUrl.findOrMake = ( url, callback )=> {
    ShortUrl.isDuplicate(url, (error, orig) => {
        if(orig.length < 1 ) {
          let dbShortUrl = new ShortUrl();
          dbShortUrl.original_url = url;
          dbShortUrl.short_url = `https://microurlshort.glitch.me/${ shortid.generate() }`;
          dbShortUrl.save(callback);
        } else {
          ShortUrl.findOne({ original_url: orig }, callback);
        }
    });
};

ShortUrl.deleteOldest = (num = 1) => {
   ShortUrl.find({}).sort({ createdAt: 1 }).limit(num).exec()
   .then(arts => arts.map(art => art._id))
   .then(artIds => artIds.forEach(id => 
        ShortUrl.findByIdAndRemove(id,(err, res) => { 
            if(err) {
             console.log(err)
            } else { 
             console.log('Delete item with id: ' + id);   
            }
        })
    ));
};

module.exports = ShortUrl;
