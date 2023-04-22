const axios= require('axios');
// for clean data to hits for user
const clean_data= async()=>{
    return {
        'story_id': 1, 
        'created_at': 1, 
        'title': 1, 
        'author': 1, 
        'story_url': 1, 
        '_tags': 1,
       'points': 1,
        'story_text': 1,
        'comment_text': 1,
        'num_comments': 1,
        'story_title': 1,
        'parent_id': 1,
        'created_at_i': 1,
        'objectID':1
      }
}

const conect_nodejs= async()=>{
    
    const instance = axios.create({
        baseURL: `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`
    });
    
    const resp = await instance.get();
   
    if (resp.data.hits.lenght == 0) {
        throw new Error(`Ocurrio un error al buscar Direcciones de Cliente ${encodedUlr}`);
    }
    const data = resp.data.hits;
    return data;

}

const last_data= async(nodeRegister_list,nodejs_log)=>{
    
    let date=null;

    if(existData(nodeRegister_list) && existData(nodejs_log)){
        if(nodejs_log.lastid_date.getTime()>nodeRegister_list.created_at.getTime()) date=nodejs_log.lastid_date;
        else  date= nodeRegister_list.created_at;
     }else if(existData(nodeRegister_list)){
        date= nodeRegister_list.created_at;
     }else if (existData(nodejs_log)){
        date=nodejs_log.lastid_date;
     } 
     console.log(date);
     return date;
}

const existData= (dataJSON)=>{
    if(dataJSON){
        return true;
    }else return false;

}



module.exports.functionService = {
    clean_data,
    conect_nodejs,
    last_data,
    existData
 };