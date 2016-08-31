'use strict';
var express = require('express');
var requestApi = require('superagent');
var router = express.Router()
var ractive = require('ractive-engine');
var path = require('path');
var fs = require('fs');
var app = express();

var node_env = global.process.env.NODE_ENV = global.process.env.NODE_ENV === 'production' ? global.process.env.NODE_ENV:'dev'

//console.log(global.process.env.NODE_ENV)
//console.log(node_env)
app.use(express.static(__dirname+'/ccc'));

app.set('views',__dirname + '/ccc')

console.log(app.get('views'))

app.engine('.html',ractive.express({
    enableCache:node_env === 'dev'?false:true,
    ext:'.html',
    layoutRoot:__dirname + '/ccc',
    templateLoader:function(request, resolveFrom){
        var file = path.join(resolveFrom, request);
          if (fs.existsSync(file)) {
            return file;
          }
          // from view root
          return path.join(__dirname+'/ccc/global/views/layouts/',request);
    }
}));
app.set('view engine', '.html');


app.get('/index',function(req,res,next){
    //res.locals.title = '我是首页';
    res.render('index/views/index',{
        title:'我是首页'
    });
})

app.get('/aboutme',function(req,res){
    res.render('aboutme/views/about.html');
})



app.listen(3001,function(){
    console.log(this.address())
    console.log('app server listen on==='+this.address().address.toString()+':'+this.address().port)
//    console.log( this)
//    console.log('&&&&&&&&&&&&&&&&&&')
//    console.log( app)
})