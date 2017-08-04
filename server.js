var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();

var port = process.env.PORT || 8080;
app.listen(port);
var upload = multer({ dest: './uploads/' });
//app.use(bodyParser.urlencoded({ extended: false }));

console.log("Listening on " + port);
app.use(bodyParser.json());
app.use(express.static('views'));

app.post('/upload', upload.single('upl'), function(req, res){
    console.log("POST request for /upload");
    console.log(req.file);
    var fileData = {
        name: req.file.originalname,
        size: req.file.size,
        date: new Date().toGMTString()
    };
    res.end(JSON.stringify(fileData));
});