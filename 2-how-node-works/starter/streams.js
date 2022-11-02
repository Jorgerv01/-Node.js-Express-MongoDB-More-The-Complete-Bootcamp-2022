const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //   // Solution 1
  //   fs.readFile("test-file.txt", (err, data) => {
  //     err && console.log(err.message);
  //     res.end(data);
  //   });
  //   // Solution 2: Streams
  //   const redeable = fs.createReadStream("test-file.txt");
  //   redeable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });

  //   redeable.on("end", () => {
  //     res.end();
  //   });

  //   redeable.on("error", (err) => {
  //     console.log(err.message);
  //     res.statusCode = 500;
  //     res.end("File not found!");
  //   });
  // });

  // Solution 3
  const redeable = fs.createReadStream("test-file.txt");
  redeable.pipe(res);
});

server.listen(8000, "localhost", () => {
  console.log("Server is up!!");
});
