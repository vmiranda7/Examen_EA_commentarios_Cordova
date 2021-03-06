var express = require("express"),
    app = express(),
    http = require("http"),
    server = http.createServer(app),
    cors = require('cors'),
    mongoose = require('mongoose');


app.configure(function () {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(cors());
    app.use(app.router);
});

app.get('/', function (req, res) {
    res.send("API EXAMEN Mensajes");
});

routes = require('./routes/comments')(app);

mongoose.connect('mongodb://localhost/DBEXAMEN', function (err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    } else {
        console.log('Connected to Database');
    }
});

server.listen(3000, function () {
    console.log("Node server running on http://localhost:3000");
});