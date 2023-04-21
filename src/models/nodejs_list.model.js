const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodejs_list = new Schema({
  
    created_at: {type:Date,default:new Date()},
    title:{type:String, default:null},
    url: {type:String,default:null},
    author: {type:String,default:null},
    comment_text:{type:String},
    story_id:{type:String},
    parent_id:{type:String},
    created_at_i: {type:Number},
    _tags: [],
    objectID:{type:String} 
    
  });

  module.exports = mongoose.model('nodejs_lists', nodejs_list);