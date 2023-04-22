const nodejs_log= require('../../models/nodejs_logs.model');
// function for register log
const registerLog = async(item)=>{
  
    try{

        const reglog = new nodejs_log({
            data_execute: item.data_execute,
            lastid_date:item.lastid_date,
            msg:item.msg,
            type:item.type,
            error:item.error,
            nodejs_id_list:item.nodejs_id_list
        });

    await reglog.save();
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}

const found_lastRegisterLog= async()=>{
    try{
       //take the last execute delete for take the array that who elements was deleted 
       let last_logResgitered= nodejs_log.findOne({type:"delete"}).sort({data_execute:-1});
       //return the object
       return last_logResgitered;
    }catch(e){
      console.log(e);
      return false;
    }

}


const found_lastElement= async()=>{
  try{
     //It takes the date of the most recent record item in the 'nodejs_lists' 
     //collection before it was deleted with this data can be used to avoid inserting the deleted item again.
     let last_logResgitered= nodejs_log.findOne({type:"delete"}).sort({lastid_date:-1});
     return last_logResgitered;
  }catch(e){
    console.log(e);
    return false;
  }

}
module.exports.nodejs_logsService = {
    registerLog,
    found_lastRegisterLog,
    found_lastElement
 };