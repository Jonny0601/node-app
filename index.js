'use strict';
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var router = express.Router();
var request = require('superagent');
var path = require('path');
var fs = require('fs');


global.appRoot = __dirname;


var app = express();
app.use(express.static(path.join(appRoot,'ccc')));//静态文件托管

app.use(cookieParser());
app.use(session({
    secret: '12345',
    name:'mySESSION_ID', //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie:{maxAge:300000},//设置maxAge是80000ms，即5分钟后session和相应的cookie失效过期
    resave:false,
    saveUninitialized: true
}))


app.all('*',(req,res,next)=>{
    console.log('输出locals')
    console.log(res.locals)
    console.log('输出locals')
    next('route')
})


app.get('/',(req,res,next)=>{
    if(req.session.lastPage){
        console.log('上一次访问的页面是：'+req.session.lastPage)
    }
    
    req.session.lastPage = '/'; //每一次访问时，session对象的lastPage会自动的保存或更新内存中的session中去。
    res.render('index/views/index')
})

require('./requireRouter')(__dirname,router,app)




app.listen(3001,function(){
    console.log(this.address())
    console.log('app server listen on==='+this.address().address.toString()+':'+this.address().port);
    console.log('当前工作目录为：'+process.cwd())
//    console.log( this)
//    console.log('&&&&&&&&&&&&&&&&&&')
//    console.log( app)
})