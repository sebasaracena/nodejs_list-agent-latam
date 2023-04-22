
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodejs_log = new Schema({
     
    data_execute: {type:Date,default:new Date()},//date when is method was executed 
    lastid_date:{type:Date,default:null},//the last date of the item that has been registered 
    //in the database (delete function) or the last date of the item found in the records of the collection 'nodejs_lists'.
    msg:{type:String},// message for logs  
    type:{type:String},//action for register if register or delete some items in mongoDB
    error:{type:Boolean},// if there is an error, it is registered with a boolean value "true" or "false".
    nodejs_id_list:[],// the items that it was inserted or deleted in 'nodejs_lists'
    
  });

  module.exports = mongoose.model('nodejs_logs', nodejs_log);