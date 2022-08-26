FROM node:18-alpine3.15

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./
RUN npm install -s && npm install express express-favicon \
    && echo 'const express = require("express"); \
    const favicon = require("express-favicon"); \
    const path = require("path"); \
    const port = process.env.PORT || 3000; const app = express(); \
    app.use(favicon(`${__dirname}/build/favicon.ico`)); \
    app.use(express.static(__dirname)); \
    app.use(express.static(path.join(__dirname, "build"))); \
    app.get("/ping", (req, res) => { \
    return res.send("pong"); \
    }); \
    app.get("/*", (req, res) => { \
    res.sendFile(path.join(__dirname, "build", "index.html")); \
    }); \
    app.listen(port);' > server.js
COPY build ./build

CMD ["node", "server.js"]