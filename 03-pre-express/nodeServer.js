// http is native to NodeJS
const http = require("http");
// fs - gives access to this computer file system
const fs = require("fs");

// the http module has a createSever method
// takes 1 arg:
// 1. callback, callback has 2 args: request, response

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    // the user wants the home page

    // res - way to respond to the requester
    // http message
    // 1. start-line
    // 2. header
    // 3. body
    // writeHead takes 2 args:
    // 1. status code
    // 2. object for the mime-type
    res.writeHead(200, { "content-type": "text/html" });
    // res.write("");
    const homePageHTML = fs.readFileSync("node.html");
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/node.png") {
    res.writeHead(200, { "content-type": "image/png" });
    const image = fs.readFileSync("./node.png");
    res.write(image);
    res.end();
  } else if (req.url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    const css = fs.readFileSync("./styles.css");
    res.write(css);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<h4>Sorry, there is no page you are looking for!</h4>");
    res.end();
  }
});

// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. port to listen for http traffic on
server.listen(3000);
