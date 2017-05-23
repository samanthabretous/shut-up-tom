const router = require('express').Router();
const Sound = require('mongoose').model('Sound');
const Team = require('mongoose').model('Team');

//Response from the home page
const getSound = (req, res, next) => {
  Sound.find({}, (err, data) => {
    res.send(data);
  })
}

const createSound = (req, res) =>{
  console.log(req.body)
  Sound.create(req.body, (err, data) => {
    if(err) console.log("Error creating ToDo Action")
    else res.send(data);
  })
}

const deleteSound = (req, res) =>{
  Sound.remove(req.body, (err) =>{
    if(err)console.log("Error removing todo")
    else console.log('Delete successful')
  })
}

const updateSoundByTeam = (req, res) => {
  console.log(req.body.slack);
  Sound.update(
    {team_id: req.body.team_id, device_name: req.body.device_name},
    {"$push": { readings: req.body.sound }},
    (err, data) => {
      if(err) console.log('there was an error updating')
      else {
        res.send({ sound: req.body.sound, teamId: req.body.team_id });
      }
    }
  );
}

const createNewDevice = (req, res) => {
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
  .post(createNewDevice)
  .put(updateSoundByTeam)

module.exports = router;
