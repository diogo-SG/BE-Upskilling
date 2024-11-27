import http from "http";

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  // res.write('Hello World');
  // res.end();

  // if only returning a single chunk of data, we can just do:
  res.end("Hello World");
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT} `);
});
