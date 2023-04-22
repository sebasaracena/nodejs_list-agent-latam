const axios= require('axios');
/**
 * @author Sebastian Aracena
 * @description for clean data to hits for user
 *  * @returns  Cleans up the variables needed for cleaner display of 'nodejs_lists' items, this is delivered in a project method used for the mongo query.
 */
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
/**
 * @author Sebastian Aracena
 * @description conect with API REST
 * @returns hits from nodejs
 */
const conect_nodejs= async()=>{
    //conect with API REST used axios library
    const instance = axios.create({
        baseURL: `https://hn.algolia.com/api/v1/search_by_date?query=nodejs`
    });
    // request GET
    const resp = await instance.get();
   
    if (resp.data.hits.lenght == 0) {
        throw new Error(`Ocurrio un error al buscar Direcciones de Cliente ${encodedUlr}`);
    }
     //response the services
    const data = resp.data.hits;
    return data;

}
/**
 * @author Sebastian Aracena
 * @description take the two objets one for nodejs_lists other from node_logs and compare the date
 * @returns date more higher
 */
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