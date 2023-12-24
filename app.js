

const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile("message.txt", { encoding: "utf-8" }, (err,data) => {
            if(err){
                console.log(err);
            }
        console.log(`data from file` + data);
        res.write("<html>");
        res.write("<head><title>enter message</title></head>");
        res.write(`<body>${data}</body>`);
        res.write(`<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Submit</button></form></body>`);
        res.write("</html>");
        return res.end();
    });
}
    else if(url ==='/message' && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk); //array
    });
    return req.on('end', () => {
        const parsedBody = Buffer.concat(body).toString();
        console.log('parsedBody>>>>>', parsedBody);
        const message = parsedBody.split('=')[1];
        fs.writeFile("message.txt", message, (err) => {
        console.log(`indise fs.writefile`);
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
        });
    });
  }
    else{
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>node js response</title></head>');
    res.write('<body><h1>hello from node js</h1></body>');
    res.write('</html>');
    res.end();
    }
});
server.listen(3000);