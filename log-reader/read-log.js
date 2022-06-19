const express = require('express');
const app = express();
const fs = require('fs');

let logs = {
    'Sonarr': 'M:/cfg/sonarr/logs/sonarr.txt',
    'Sonarr-sma': 'M:/cfg/sonarr-sma/sma.log',
    'Radarr': 'M:/cfg/radarr/logs/radarr.txt',
    'Radarr-sma': 'M:/cfg/radarr-sma/sma.log',
}

app.get('/log/:module', function(req, res) {
    if (logs[req.params.module]) {
        fs.readFile(logs[req.params.module], 'utf8', function (err, data) {
            res.send(data);
        });
    }
    else {
        res.send('Log not found!');
    }
});

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Log reader listening at http://localhost:8081");
});