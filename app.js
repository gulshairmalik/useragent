var express = require('express');
var path = require('path');
var uaParser = require('ua-parser-js');
var app = express();
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var lang = req.acceptsLanguages('fr','es','en-US','en','ast','bg','eu','zh','en-au','en-bz','en-ca','en-ie','en-nz','en-za','en-gb','de','hi','ko','fa','ur','tr');
    var ua = uaParser(req.headers['user-agent']);
    var results = {
        ip:ip,
        language:lang,
        OS:ua.os.name+" "+ua.os.version,
        browser:ua.browser.name+" "+ua.browser.version
    }
    res.render('index',{res:results});
});

app.get('/api', function(req, res) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    var lang = req.acceptsLanguages('fr','es','en-US','en','ast','bg','eu','zh','en-au','en-bz','en-ca','en-ie','en-nz','en-za','en-gb','de','hi','ko','fa','ur','tr');
    var ua = uaParser(req.headers['user-agent']);
    var results = {
        ip:ip,
        language:lang,
        OS:ua.os.name+" "+ua.os.version,
        browser:ua.browser.name+" "+ua.browser.version
    }
    res.send(results);
});

app.listen(port);