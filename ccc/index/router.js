'use strict'
module.exports = function(router){
    
    router.get('/index',function(req,res,next){
        if(req.session.lastPage){
            console.log('Last page was: ' + req.session.lastPage + ".");    
        }
        
        req.session.lastPage = '/index'
        res.redirect('/')
    })
    
   
    
    router.get('/index/list',function(req,res,next){
        req.request.get('http://www.expressjs.com.cn/guide/error-handling.html')
            .end(function(e,r){
            console.log(r.text)
            res.json(r.text)
        })
//        res.render('index/views/list',{
//            list:[1,2,3,4,5,6,]
//        })
    })
    return router;
}