'use strict'

module.exports = function(router){
    router.get('/aboutme',function(req,res,next){
        res.render('aboutme/views/index')
    })
    
    return router;
}