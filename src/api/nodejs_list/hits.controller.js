
const {hitsService}= require('./hits.services');

const hitsList = async(req,res)=>{
    try{
         
        response= await hitsService.hitsList(req.body);
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
const deleteHit = async(req,res)=>{
    try{
       
        response= await hitsService.deletehit(req.params.id);
        return res.json({
            error: false,
            msg: 'ok',
            data:response.msg,
            
        })

    }catch(e){
        return res.json({
            error: true,
            msg: e
        });
    }
}

const serverConectHits = async(req,res)=>{
    try{
        date= new Date();
        response= await hitsService.serverConectHits(date);
        return res.json({
            error: false,
            msg: 'ok',
            data:response,
            
        })

    }catch(e){
        return res.json({
            error: true,
            msg: e
        });
    }
}
module.exports.hitsController = {
    hitsList,
    deleteHit,
    serverConectHits
 };