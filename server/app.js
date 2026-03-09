const fs = require('fs');
const path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app=express();
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));// 创建 application/x-www-form-urlencoded 编码解析 // app.use(bodyParser.json());//
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,AccessToken,X-CSRF-Token, Authorization, Token, href, UserId, uid, mid, skey, btt");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");//application/x-protobuf
    next();
});


// 初始化游戏列表数据：读取icons目录数据
const iconsData ={}
const iconsDir = path.join(__dirname, 'icons');
const entries = fs.readdirSync(iconsDir, { withFileTypes: true });
for (const entry of entries) {
    if (entry.isDirectory()) {
        iconsData[entry.name] = [];
        const iconsDir1 = path.join(iconsDir, entry.name);
        const entries1 = fs.readdirSync(iconsDir1, { withFileTypes: true });
        for (const entry1 of entries1) {
            if (entry1.isFile()) {
                iconsData[entry.name].push(entry1.name);
            }
        }
    }
}


//http://localhost:9000/gamelist
app.get('/gamelist',function(req,res){
    var ret= {
        "code": 0,
        "data": iconsData
        // "msg": "查询失败"
    }
    
    res.send(JSON.stringify(ret))
});

//http://localhost:9000/login
app.get('/login',function(req,res){
    var ret= {
        "code": 0,
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSUQiOjAsIlVzZXJuYW1lIjoiIiwiTmlja05hbWUiOiIiLCJBdXRob3JpdHlJZCI6MCwiQnVmZmVyVGltZSI6MCwiVXNlck5hbWUiOiJ5dW55aW5nU3Vuam9nbyIsIkN1cnJlbmN5IjoiVVNEIiwiUmVnaW9uIjoiMyIsIkdhbWVGaWVsZCI6MH0.ohHC-fRYnG63nnKR6IXUJGJt12y-BLChAcgubhZTQk8",
            "user": {
                "ID": 5330,
                "nickName": "黑豹VIP 878236751",
                "currency": "USD",
                "region": "0",
                "gameField": 0,
                "coin": 0
            }
        }
        // "msg": "查询失败"
    }

    res.send(JSON.stringify(ret))
});

//http://localhost:9000/register
app.get('/register',function(req,res){
    var ret= {
        "code": 0,
        "data": {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIiwiSUQiOjAsIlVzZXJuYW1lIjoiIiwiTmlja05hbWUiOiIiLCJBdXRob3JpdHlJZCI6MCwiQnVmZmVyVGltZSI6MCwiVXNlck5hbWUiOiJ5dW55aW5nU3Vuam9nbyIsIkN1cnJlbmN5IjoiVVNEIiwiUmVnaW9uIjoiMyIsIkdhbWVGaWVsZCI6MH0.ohHC-fRYnG63nnKR6IXUJGJt12y-BLChAcgubhZTQk8",
            "user": {
                "ID": 5330,
                "nickName": "黑豹VIP 878236751",
                "currency": "USD",
                "region": "0",
                "gameField": 0,
                "coin": 0
            }
        }
        // "msg": "查询失败"
    }

    res.send(JSON.stringify(ret))
});

//http://localhost:9000/userinfo
app.get('/userinfo',function(req,res){
    var ret= {
        "code": 0,
        "data": {
            "ID": 5330,
            "nickName": "黑豹VIP 878236751",
            "currency": "USD",
            "region": "0",
            "gameField": 0,
            "coin": 0
        }
        // "msg": "查询失败"
    }

    res.send(JSON.stringify(ret))
});



app.listen(9000);
console.log("game server is listening on " +9000);




