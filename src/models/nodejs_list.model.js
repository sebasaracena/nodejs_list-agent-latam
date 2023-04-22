const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodejs_list = new Schema({
  created_at: Date,
  title: String,
  url: String,
  author: String,
  points: Number,
  story_text: String,
  comment_text: String,
  num_comments: Number,
  story_id: Number,
  story_title: String,
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  _tags: [String],
  objectID: String,
  _highlightResult: {
    author: {
      value: String,
      matchLevel: String,
      matchedWords: [String]
    },
    comment_text: {
      value: String,
      matchLevel: String,
      fullyHighlighted: Boolean,
      matchedWords: [String]
    },
    story_title: {
      value: String,
      matchLevel: String,
      matchedWords: [String]
    },
    story_url: {
      value: String,
      matchLevel: String,
      matchedWords: [String]
    }
  }
});


// new Schema({
  
//     created_at: {type:Date,default:new Date()},
//     title:{type:String, default:null},
//     url: {type:String,default:null},
//     author: {type:String,default:null},
//     comment_text:{type:String},
//     story_id:{type:String},
//     parent_id:{type:String},
//     created_at_i: {type:Number},
//     _tags: [],
//     objectID:{type:String} 
    
//   });

  module.exports = mongoose.model('nodejs_lists', nodejs_list);