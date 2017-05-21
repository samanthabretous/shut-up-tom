const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const teamSchema = mongoose.Schema({
  access_token: {type: String, required: true},
  team_name: {type: String, required: true},
  team_id: { type: String, require: true },
  incoming_webhook: {
    channel: String,
    channel_id: String,
    configuration_url: String,
    url: String
  },
  bot: {
    bot_user_id: String,
    bot_access_token: String
  },
  sound_id: {type: ObjectId, ref: 'Sound'}
});

mongoose.model('Team', teamSchema);
