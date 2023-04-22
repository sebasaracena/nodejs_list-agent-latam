const {nodejs_logsService}= require('./node_logs.services');
 
const logsList = async(req,res)=>{
    try{
         
        response= await nodejs_logsService.logsList(req.body);
        return res.json({
            error: false,
            msg: 'ok',
            data:response.data,
            total:response.total,
            lastPage:response.lastPage,
            realPage:response.realPage
            
        })

    }catch(e){
        return res.json({
            error: true,
            msg: e
        });
    }
}

module.exports.nodejs_logsController = {
    logsList
   
 };