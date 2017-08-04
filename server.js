var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var fs = require('fs');
var app = express();

var port = process.env.PORT || 8080;
app.listen(port);
var upload = multer({ dest: './' });
//app.use(bodyParser.urlencoded({ extended: false }));

console.log("Listening on " + port);
app.use(bodyParser.json());
app.use(express.static('views'));

app.post('/upload', upload.single('upl'), function(req, res){
    console.log("POST request for /upload");
    console.log(req.file);
    var filepath = "./" + req.file.path;
    var fileData = {
        name: req.file.originalname,
        size: req.file.size,
        date: new Date().toGMTString()
    };
    //Immediately delete file, as we just wanted that sweet metadata
    fs.unlinkSync(filepath);
    res.writeHead(200, {"content-type":"application/json"});
    res.end(JSON.stringify(fileData));
});