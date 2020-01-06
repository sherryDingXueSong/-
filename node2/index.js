const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname)));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

//设置跨域请求 （方法2中所指的服务器端增加的代码）
// app.all("*", function(req, res, next) {
//   //设置请求头
//   //允许所有来源访问
//   res.header("Access-Control-Allow-Origin", "*");
//   //用于判断request来自ajax还是传统请求
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   //允许访问的方式
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   //修改程序信息与版本
//   res.header("X-Powered-By", " 3.2.1");
//   //内容类型：如果是post请求必须指定这个属性
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

app.post("/test", function(req, res) {
  console.log(req.body);
  const { username, userpwd } = req.body;
  const msg = `welcome, ${username}, your default passworld is ${userpwd}，使用代理的方法`;
  //返回给代理服务器的数据
  res.send(msg);
});

app.post("/test222", function(req, res) {
  console.log(req.body);
  const { username, userpwd } = req.body;
  const msg = `welcome, ${username}, your default passworld is ${userpwd}，使用配置服务器端的方法`;
  res.send({
    code: 0,
    data: msg
  });
});

/** jsonp方式解决跨域问题 只适用于get请求 */
app.get("/get", function(req, res) {
  console.log("hahahahahh");
  console.log(req.query);
  const { username, userpwd } = req.query;
  const msg = `callback("${username}", "${userpwd}")`;
  res.send(msg);
});

app.listen(4000, "0.0.0.0", () => {
  console.log("4000.........");
});
