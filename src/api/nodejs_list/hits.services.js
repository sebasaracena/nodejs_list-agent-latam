const nodejs_list= require('../../models/nodejs_list.model');
const {nodejs_logsService}= require('../nodejs_logs/node_logs.services');
const {functionService}= require('../../utilities/function.service');

const hitsList = async(body)=>{
 
    let page=  body.page == undefined || body.page <= 0 ? 1 : body.page;
    let skip=0;
    const limit= body.limit == undefined ? 5: body.limit;
    const search= body.search==  undefined? {}: body.search;
    const project= await functionService.clean_data();
    //The variable 'match' is used to create a filter for the query.
    let match= {};
    //Calculate the 'skip' for the elements the user wants to see.
    if(page>1) skip= (page-1)*limit;
    else skip=0;
    //Separed each variable for object search
    if(Object.entries(search).length!=0){
     //If search have title atribute for filter
        if(search.hasOwnProperty('title')){ 
        match["title"]={
        '$regex': search.title,
        '$options': 'i'
      };
    }
    //if search have author atribute for filter
    if(search.hasOwnProperty('author')){ 
        match["author"]={
        '$regex': search.author,
        '$options': 'i'
      };
    }

    if(search.hasOwnProperty('_tags')){ 
        if(search._tags.length>0) match._tags= {$in:search._tags};
    }
  
    
    } else match=search;
   
     
    
   // try execute the query for 
    try{
        let count= await nodejs_list.aggregate([ {
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

       let data= await nodejs_list.aggregate([ {
        '$match':match
       },
       {
        '$skip': skip
    },
         {
            '$limit': limit
        },

        {
            '$project':project
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

const deletehit = async(id)=>{

    try{
        let msg="elemento no encontrado "+id;
        // The purpose of the date variable is to record the date when the function was executed
        let date=new Date();
        let idRegisters=[];
        // Looking for  the last registered date was on this date in collection nodejs_list. This data is put it in the 'registerLog' collection, which is in the 'nodejs_log
        let nodeRegister_list = await nodejs_list.findOne({},{created_at:1}).sort({created_at : -1});
        //The purpose of this function is to find the most recent log entry when a user deleted a piece of data.
        let nodejs_log = await nodejs_logsService.found_lastRegisterLog();
        //If 'nodejs_log' is not null, then 'idRegsiter' will copy an array with items that have a 'story_id'
        if(nodejs_log) idRegisters=nodejs_log.nodejs_id_list;
      
       //looking the data for objectID
       let hitStory= await nodejs_list.findOne({objectID:id});
       
       if(hitStory){ 
        //When a 'objectID' is deleted, it have to be added to the 'nodejs_log' collection to show which elements have been deleted
        idRegisters.push({story_id:hitStory.story_id,objectID:hitStory.objectID});
        //Delete the element
         await hitStory.deleteOne();
         msg="elemento "+id+" eliminado";
         }

       //Creating the data be put in in the 'nodejs_log'
       let logJson={
        data_execute: date,
        lastid_date:nodeRegister_list.created_at,
        msg:msg,
        type:"delete",
        error:false,
        nodejs_id_list:idRegisters,
    }
    //data log registered
    await nodejs_logsService.registerLog(logJson); 
      return {
        msg:'The hit was deleted successfully.'
      }
    }
    catch(e){
        console.log(e);
        return {msg:"error no se encontro el id "+e}
    }
    
}

//insert the news element in the dataBaseMongo
const serverConectHits = async(date)=>{
    try{
    // Variable to be used to the first record of the program when there is no element in the collection 'nodejs_list'.
    let empty=false;
    //takes the most recent item from nodejs_list
    let nodeRegister_list = await nodejs_list.findOne({},{created_at:1}).sort({created_at : -1});
    //take the recent element was deleted this register, it has the most current date of the 'nodejs_list' records.  
    let nodejs_log = await nodejs_logsService.found_lastElement();
    //lastdata' take the most current date and compare with the REST API
    //dates so that deleted items are not reinserted into the 'nodejs_list' collection.
    let lastdata = await functionService.last_data(nodeRegister_list,nodejs_log);
    //if  lastdata is null empty is true
     if(!lastdata) empty=true;
    //Conect API REST for take de data 
    let dataJSON = await functionService.conect_nodejs();
    //for the msg for 'nodejs_logs'
    let msg="";
    //register items inserted in 'nodejs_list' collection this variable use for nodejs_logs
    let idRegisters=[];
    // how many elements was register in 'nodejs_list'
    let count=0;
    await Promise.all(dataJSON.map(async(item) => {
        let data= new Date(item.created_at);
        let insert=false;
        //If 'nodejs_lists' no have elements
        if(!nodeRegister_list){ 
             if(item.story_id){
             //insert items in 'nodejs_lists'
             insert= await insertHits(item);
             //Put in items in register for 'nodejs_logs'
             idRegisters.push({story_id:item.story_id,objectID:item.objectID});
             //count elements that register in 'nodejs_lists'
             count=count+1;
            }
        }
        //If nodejs_list have elements
        else{ 
           //Compare the date with each date delivered by the elements extracted by the REST API of 'hn.algolia.com'.
          if(lastdata && data.getTime()>lastdata.getTime() && item.story_id){
              //insert items in 'nodejs_lists'
              insert= await insertHits(item);
              //Put in items in register for 'nodejs_logs'
              idRegisters.push({story_id:item.story_id,objectID:item.objectID});
              //count elements that register in 'nodejs_lists'
              count=count+1;
             
          }
      
        } 

        
    }));

    msg=""+count+" hits have been registered"; 
    //If empty, it takes the current data that was inserted in the 'nodejs_list' step on line 166
    if(empty) nodeRegister_list = await nodejs_list.findOne({},{created_at:1}).sort({created_at : -1});
    // make logJSON for the register of log
    let logJson={
        data_execute: date,
        lastid_date:nodeRegister_list.created_at,
        msg:msg,
        type:"register",
        error:false,
        nodejs_id_list:idRegisters,
    }
    //register data in nodejs_logs 
    await nodejs_logsService.registerLog(logJson); 
    
    return true;

} catch(e){ 
   
    console.log(e);
    return false;
}
}

const insertHits = async(item)=>{
    
    try{
        const newhit = new nodejs_list({
            
                created_at: new Date(item.created_at),
                title: item.story_title,
                url: item.story_url,
                author: item.author,
                points: item.points,
                story_text: item.story_text,
                comment_text: item.comment_text,
                num_comments: item.num_comments,
                story_id: item.story_id,
                story_title: item.story_title,
                story_url: item.story_url,
                parent_id: item.parent_id,
                created_at_i: item.created_at_i,
                _tags: item._tags,
                objectID: item.objectID,
                _highlightResult:item._highlightResult
              

    });
    await newhit.save();
    return true;
  }catch(e){
    console.log(e);
    return false;
  }
}



module.exports.hitsService= {
    hitsList,
    deletehit,
    serverConectHits
 };