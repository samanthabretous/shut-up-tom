const router = require('express').Router();
const Team = require('mongoose').model('Team');

//Response from the home page
const getTeam = (req, res, next) => {
  Team.find({}, (err, data) => {
    res.send(data);
  })
}

const createTeam = (req, res) =>{
  console.log(req.body)
  Team.create(req.body, (err, data) => {
    if(err) console.log("Error creating ToDo Action")
    else res.send(data);;
  })
}

const deleteTeam = (req, res) =>{
  Team.remove(req.body, (err) =>{
    if(err)console.log("Error removing todo")
    else console.log('Delete successful')
  })
}

const updateTeam = (req, res) => {
  console.log(req.body)
  Team.update(
    {_id: req.body.id},
    req.body,
    {upsert: true},
    (err) => {
      if(err) console.log('there was an error updating')
      else console.log("updated todo")
    }
  );
}

const getOneTeam = (req, res) => {
  Team.findById(req.params.id, (err, data) => {
    res.send(data);
  })
};

//configure router for get and post calls
router.route('/:id')
  .get(getOneTeam)

router.route('/')
  .get(getTeam)
  .post(createTeam)
  .delete(deleteTeam)
  .put(updateTeam)

module.exports = router;
