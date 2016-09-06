'use strict';

var fs = require('fs');
var path = require('path');
var ractive = require('ractive-engine');


var node_env = global.process.env.NODE_ENV = global.process.env.NODE_ENV === 'production' ? global.process.env.NODE_ENV:'dev';


module.exports = function(appRoot,router,app){
    
    app.set('view cache', false) //取消模板的缓存

    app.set('views',path.join(appRoot,'ccc')) //模板文件的访问path


    //定义模板引擎
    app.engine('.html',ractive.express({
        enableCache:node_env === 'dev'?false:true,
        ext:'.html',
        layoutRoot:path.join(appRoot,'ccc'),
        templateLoader:function(request, resolveFrom){
            var file = path.join(resolveFrom, request);
              if (fs.existsSync(file)) {
                return file;
              }
              // from view root
              return path.join(path.join(appRoot,'/ccc/global/views/layouts/'),request);
        }
    }));
    app.set('view engine', '.html'); //设置模板引擎
    
    fs.readdir(path.join(appRoot,'ccc'),function(err,files){
        if(err){
            return err;
        }
        //console.log(files);
        if(files.length){
            files.forEach(function(filepath,index){
                var fullpath = path.join(appRoot,'ccc',filepath,'router.js')
                console.log(fullpath)
                fs.exists(fullpath,function(exists){
                    console.log(exists+':'+index);
                    if(exists){
                        console.log('@@@@@')
                        console.log(fullpath)
                        console.log('@@@@@')
                        app.use('/',require(fullpath)(router))
                    }
                })
            })
        }
    })
}