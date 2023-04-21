
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodejs_log = new Schema({
     
    data_execute: {type:Date,default:new Date()},
    lastid_date:{type:Date,default:null},
    msg:{type:String},
    type:{type:String},
    error:{type:Boolean},
    nodejs_id_list:[],
    
  });

  module.exports = mongoose.model('nodejs_logs', nodejs_log);