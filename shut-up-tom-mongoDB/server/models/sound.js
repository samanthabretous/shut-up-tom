const mongoose = require('mongoose');

const soundSchema = mongoose.Schema({
  blogTitle: {type: String, required: true},
  blogAuthor: String,
  date: { type: Date, default: Date.now },
  location: String,
  bodyText: String,
  categories: [{type: String}],
  images: String,
  comments: [Number]
});

mongoose.model('Sound', soundSchema)
