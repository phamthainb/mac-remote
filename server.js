const express = require('express');
const robot = require('robotjs');
const os = require('os');
const { join } = require('path');

const app = express();
const port = 3000;



function getLocalIP() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        const interface = networkInterfaces[interfaceName];
        for (const { address, family } of interface) {
            if (family === 'IPv4' && address !== '127.0.0.1') {
                return address;
            }
        }
    }

    return null; 
}

var localIP = getLocalIP();
console.log({ localIP });

app.use(express.static('public'));

app.get('/control', (req, res) => {
    const key = req.query.key;
    console.log({ key });
    robot.keyTap(key);
    res.sendStatus(200);
});
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'))
})
app.listen(port, () => {
    console.log(`Server is running on http://${localIP}:${port}`);
});
