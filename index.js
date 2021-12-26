const express = require("express");
const app = express();

const http = require("http").createServer(app);

const io = require("socket.io")(http);
require("./socket")(io);


app.use(express.static(__dirname + "/public"));

app.get("/", (_, res) => {
    res.sendFile(__dirname + "/views/index.html");
});


http.listen(8080);
console.log("ready on http://localhost:8080");