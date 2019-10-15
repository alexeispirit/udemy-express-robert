// http is native to NodeJS
const http = require("http");

// the http module has a createSever method
// takes 1 arg:
// 1. callback, callback has 2 args: request, response

const server = http.createServer((req, res) => {
  // console.log(req);
  // res - way to respond to the requester
  // http message
  // 1. start-line
  // 2. header
  // 3. body
  // writeHead takes 2 args:
  // 1. status code
  // 2. object for the mime-type
  res.writeHead(200, { "content-type": "text/html" });
  res.write("<h1>Hello</h1>");
  res.end();
});

// createServer returns an object with a listen method
// listen takes 1 arg:
// 1. port to listen for http traffic on
server.listen(3000);
