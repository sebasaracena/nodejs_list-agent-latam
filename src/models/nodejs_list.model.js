const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nodejs_list = new Schema({
  created_at: Date, //date was element was create
  title: String,//title the articule
  url: String,//string form the blog
  author: String,//who writing the articule
  points: Number,
  story_text: String,//text from articule 
  comment_text: String,//coment from the articule
  num_comments: Number,//numbers coments
  story_id: Number,//id Story is not unique
  story_title: String,//title articule
  story_url: String,
  parent_id: Number,
  created_at_i: Number,
  _tags: [String],//tags the information
  objectID: String,//ObjectID primary key the colection
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