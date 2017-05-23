const mongoose = require('mongoose');

const soundSchema = mongoose.Schema({
  sound_level: Number,
  readings: [Number],
  custom_messages: [String],
  team_id: String,
  device_name: {type: String, required: true}
});

mongoose.model('Sound', soundSchema)
