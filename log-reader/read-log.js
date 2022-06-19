const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


let logs = {
    'Sonarr': 'M:/cfg/sonarr/logs/sonarr.txt',
    'Sonarr-sma': 'M:/cfg/sonarr-sma/sma.log',
    'Radarr': 'M:/cfg/radarr/logs/radarr.txt',
    'Radarr-sma': 'M:/cfg/radarr-sma/sma.log',
}

app.get('/log/:module', function(req, res) {
    if (logs[req.params.module]) {
        fs.readFile(logs[req.params.module], 'utf8', function (err, data) {
            if(err) {
                throw err;
            }
            var array = data.toString().split('\n');
            var out_array= [];
            if (req.query.lines) {
                for (let i = 0; i < req.query.lines; i++) {
                    out_array.push(array[array.length - 1 - i]);
                }
                out_array.reverse();
                res.send(out_array);
            }
            else {
                res.send(data);
            }

        });
    }
});

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Log reader listening at http://localhost:8081");
});