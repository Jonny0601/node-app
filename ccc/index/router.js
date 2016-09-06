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
        res.render('index/views/list',{
            list:[1,2,3,4,5,6,]
        })
    })
    return router;
}