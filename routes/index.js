var express = require("express"),
    router = express.Router(),
    bodyParser = require("body-parser"),
    request = require('request'),
    cheerio = require('cheerio');
    
router.use(bodyParser.json);
router.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res) => {
    res.render('index');
});

router.get('/test',(req,res)=>{
        res.render('test');
    });

router.post('/downloadVideo',(req,res) => {
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

module.exports = router;