const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cheerio = require('cheerio');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/',(req,res) => {
    res.render('index');
});

app.get('/test',(req,res)=>{
    res.render('test');
})

app.post('/downloadVideo',(req,res) => {
    var body = {
        url:req.body.url
    };
    request(body.url, function(error, response, html){
        console.log('working.........');
         
                if(!error){ 
                    var link;       
                    var $ = cheerio.load(html);
                   link = $(".landscape").attr('data-seek-preview-url');
                   if(link===undefined){
                   link = $(".portrait").attr('data-seek-preview-url');
                   }
                   res.redirect(link);
                }
                else{
                    res.send('failed');
                }
            });

});

app.listen(3001,()=>{
    console.log('fire up browser');
});