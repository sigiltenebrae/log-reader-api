const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));

app.get('/log/:module', function(req, res) {
    console.log(atob(req.params.module));
    fs.readFile(atob(req.params.module), 'utf8', function (err, data) {
        if(err) {
            res.send(err.message);
            return;
        }
        var array = data.toString().split('\n');
        var out_array= [];
        if (req.query.lines) {
            for (let i = 0; i < req.query.lines; i++) {
                out_array.push(array[array.length - 1 - i]);
            }
            out_array.reverse();
            res.json({log: out_array});
        }
        else {
            array.reverse();
            res.json({log: array});
            console.log('sent')
        }

    });
});

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Log reader listening at http://localhost:8081");
});