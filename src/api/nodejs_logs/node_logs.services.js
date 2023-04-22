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

const logsList = async(body)=>{
 
  let page=  body.page == undefined || body.page <= 0 ? 1 : body.page;
  let skip=0;
  const limit= body.limit == undefined ? 5: body.limit;
  const search= body.search==  undefined? {}: body.search;
  
  //The variable 'match' is used to create a filter for the query.
  let match= {};
  //Calculate the 'skip' for the elements the user wants to see.
  if(page>1) skip= (page-1)*5;
  else skip=0;
  //Separed each variable for object search
  if(Object.entries(search).length!=0){
   //If search have type atribute for filter
      if(search.hasOwnProperty('type')){ 
      match["type"]={
      '$regex': search.type,
      '$options': 'i'
    };
  }
    //If search for de current date the element was register
    if(search.hasOwnProperty('lastid_date')){ 
      match["lastid_date"]=new Date(search.lastid_date);
  }
  } else match=search;
 
   
  
 // try execute the query for 
  try{
      let count= await nodejs_log.aggregate([ {
          '$match':match
         },
          {
              $count:'count'
          }
      ]);
    
    if(skip>=count[0].count){ 
      skip=0;
      page=1;
    }

     let data= await nodejs_log.aggregate([ {
      '$match':match
     },
     {
      '$sort': {
          'date_execute': -1
      }
  },
     {
      '$skip': skip
  },
       {
          '$limit': limit
      }
     
  ]);
  

  
      return {
         data,
         total:count[0].count,
         lastPage: limit > 0 ? Math.ceil(count[0].count / limit) : 0,
         realPage:page
      }

  }catch(e){
      return {
          msg: e
      };
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
    logsList,
    found_lastElement
 };