const router = require('express').Router();
const Sound = require('mongoose').model('Sound');
const Team = require('mongoose').model('Team');
const request = require('superagent');

const getDecibel = (req, res) => {
  Team.findOne({team_id:req.params.id}, (err, data) => {
    if(err) console.log("Could not find Team",err);
    else if(!data && !data.sound_id) res.send({ noDevice: true });
    else {
      Sound.findById(data.sound_id, (err, soundData) => {
        if(err) console.log("Could not find Sound Device", err);
        const decibel = soundData.readings[soundData.readings.length -1] ? soundData.readings[soundData.readings.length -1] : 'no readings'
        res.send({decibel, soundData})
      })
    }
  })
}

const randomMessage = (messages) => {
  return messages[Math.floor(Math.random()*messages.length)];
};

const updateSoundByTeam = (req, res) => {
  Sound.findOneAndUpdate(
    {team_id: req.body.teamId, device_name: req.body.deviceName},
    {"$push": { readings: req.body.sound }},
    {new: true},
    (err, soundData) => {
      if(err) console.log('there was an error updating')
      else {
        Team.findOne({team_id: req.body.teamId}, (err, data) => {
          if(err) console.log('there was an error finding team')
          else {
            if(req.body.sound > 70 && req.body.sound < 85) {
              request.post(data.incoming_webhook.url)
              .send({
                text : randomMessage(soundData.custom_messages),
                icon_emoji: ":computer:"
              })
              .then((success, failure) => {
                if(success)console.log("success");
              })
            }
          }
        });
        if(req.body.sound < 200)
        res.send({ sound: req.body.sound, teamId: req.body.teamId });
      }
    }
  );
}

const createNewDevice = (req, res) => {
  req.body.custom_messages = ["Wow, what a wonderful day, but SHUT UP!"]
  Sound.create(req.body, (err, soundData) => {
    if(err) console.log("Error creating new device")
    else {
      Team.update(
        {team_id: req.body.team_id},
        {sound_id: soundData._id},
        {upsert: true},
        (err, data) => {
          if(err) console.log('there was an error linking device to team')
          else res.send(soundData);
        }
      )
    }
  });
};

const addMessage = (req, res) => {
  console.log(req.body.message);
  Sound.findOneAndUpdate(
    {team_id: req.body.teamId},
    {"$push": { custom_messages: req.body.message }},
    {new: true}, // return update version vs the old
    (err, soundData) => {
      if(err) console.log(err);
      else {
        res.send({ messages: soundData.custom_messages });
      }
    })
}

//configure router for get and post calls
router.route('/:id')
  .get(getDecibel)
  .post(createNewDevice)
  .put(updateSoundByTeam)

router.route('/:id/message')
  .post(addMessage)

module.exports = router;
