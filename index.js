const http = require('http');
const path = require('path');
const fs = require('fs');


const server = http.createServer((req, res) => {
    // if (req.url === '/') {
    //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {

    //         if (err) throw err;

    //         res.writeHead(200, {
    //             'content-type': 'text/html'
    //         });
    //         res.end(data);
    //     })
    // }

    // if (req.url === '/about') {
    //     fs.readFile(path.join(__dirname, 'public', 'about.html'), (err, data) => {

    //         if (err) throw err;

    //         res.writeHead(200, {
    //             'content-type': 'text/html'
    //         });
    //         res.end(data);
    //     })
    // }

    // load dynamic file 

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);

    let extName = path.extname(filePath);

    let contentType = 'text/html';

    switch (extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.html':
            contentType = 'text/html';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'text/jpg';
            break;
    }


    fs.readFile(filePath, (err, data) => {

        if (err) {
            if (err.code === 'ENOENT') {
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
                    res.writeHead(200, {
                        'content-type': 'text/html'
                    });
                    res.end(data, 'utf8');
                })
            } else {
                res.writeHead(500);
                res.end(`Server Error ${err.code}`);
            }
        } else {
            res.writeHead(200, {
                'content-type': contentType
            });
            res.end(data, 'utf8');
        }

    })
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log('Server Running....')
})
