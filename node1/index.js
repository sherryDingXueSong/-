const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const axios = require("axios");

app.use(express.static(path.join(__dirname)));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.send("Hello World");
});

//使用代理的方式解决跨域 代理服务器请求目标服务器，原理是跨域问题只出现在浏览器端不出现在服务器端
app.post("/test", async function(request, response) {
  axios
    .post("http://10.1.146.10:4000/test", {
      username: request.body.username,
      userpwd: request.body.userpwd
    })
    .then(res => {
      console.log(res.data);
      response.send({
        code: 0,
        data: res.data
      });
    })
    .catch(err => {
      console.log(err);
    });
});

app.listen(3000);
