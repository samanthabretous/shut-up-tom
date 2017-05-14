const request = require('superagent');
const app = require('./server');
const http = require('http');

const server = http.createServer(app);
server.listen();

server.on('listening', function() {
    console.log(`Shut-Up-Tom-Weather is listening on ${server.address().port} in ${app.get('env')} mode.`);

    const announce = () => {
        request.put(`http://127.0.0.1:2020/service/weather/${server.address().port}`, (err, res) => {
            if(err) {
                console.log(err);
                console.log("Error connecting to Iris");
            }
        });
    };
    announce();
    setInterval(announce, 15*1000);
});
