const mongoose = require('mongoose');

const soundSchema = mongoose.Schema({
  sound_level: { type: Number, required: true },
  readings: [Number],
  custom_messages: [String]
});

mongoose.model('Sound', soundSchema)
