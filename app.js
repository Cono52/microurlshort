const express = require('express');
const bodyParser = require('body-parser');
const validURL = require('valid-url');
const ShortUrl = require('./models/ShortUrl');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + '/app/index.html');
});


app.get("/:short", (req, res) => {
  ShortUrl.findOne({ short_url: process.env.HOST+req.params.short }).exec()
    .then(url => res.redirect(url.original_url))
    .catch(err => res.json('Error: This shortened URL was not found, it may not exist or has since been removed'))
});

app.get('/new/*', (req, res) => {
    if (validURL.isWebUri(req.params[0])){
        ShortUrl.findOrMake(req.params[0], (err, savedItem) => {
          if(err){
            console.log(err);
          }
          const { original_url, short_url } = savedItem;
          res.json({ original_url, short_url });
        });
    } else {
        res.json('Error: That is not a well formed http or https URI!');
    }
});

module.exports = app;