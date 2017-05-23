const router = require('express').Router();
const Sound = require('mongoose').model('Sound');
const Team = require('mongoose').model('Team');
const request = require('superagent');

const getDecibel = (req, res) => {
  Team.findOne({team_id:req.params.id}, (err, data) => {
    if(err) console.log("Could not find Team",err);
    else if(!data.sound_id) res.send({ noDevice: true });
    else {
      Sound.findById(data.sound_id, (err, data) => {
        if(err) console.log("Could not find Sound Device", err);
        const decibel = data.readings[data.readings.length -1] ? data.readings[data.readings.length -1] : 'no readings'
        res.send({decibel})
      })
    }
  })
}

const updateSoundByTeam = (req, res) => {
  console.log(req.body.slack);
  Sound.findOneAndUpdate(
    {team_id: req.body.team_id, device_name: req.body.device_name},
    {"$push": { readings: req.body.sound }},
    (err, soundData) => {
      if(err) console.log('there was an error updating')
      else {
        console.log(soundData);
        Team.findOne({team_id: req.body.team_id}, (err, data) => {
          if(err) console.log('there was an error finding team')
          else {
            request.post(data.incoming_webhook.url)
            .send({
              text : "Hey everyone Shut Up",
              icon_emoji: ":computer:"
            })
            .then((success, failure) => {
              if(success)console.log("success");
            })
          }
        });
        res.send({ sound: req.body.sound, teamId: req.body.team_id });
      }
    }
  );
}

const createNewDevice = (req, res) => {
  req.body.custom_messages = ["Hey everyone Shut Up!"]
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

//configure router for get and post calls
router.route('/:id')
  .get(getDecibel)
  .post(createNewDevice)
  .put(updateSoundByTeam)

module.exports = router;
