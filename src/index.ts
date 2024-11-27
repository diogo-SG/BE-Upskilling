import http from "http";
import { sampleUsers } from "./utils/sample-data";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // res.write('Hello World');
  // res.end();

  // if only returning a single chunk of data, we can just do:
  //res.end("Hello World");

  const url = req.url;
  const method = req.method;

  if (method === "GET") {
    if (url === "/api/users") {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(sampleUsers));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      if (url === "/") {
        return res.end("<h1>Hello World</h1>");
      }
      if (url === "/about") {
        return res.end("<h1>About Page</h1>");
      }
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
