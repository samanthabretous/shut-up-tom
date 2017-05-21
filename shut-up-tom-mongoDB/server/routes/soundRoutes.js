const router = require('express').Router();
const Sound = require('mongoose').model('Sound');

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
    else res.send(data);;
  })
}

const deleteSound = (req, res) =>{
  Sound.remove(req.body, (err) =>{
    if(err)console.log("Error removing todo")
    else console.log('Delete successful')
  })
}

const updateSound = (req, res) => {
  console.log(req.body)
  Sound.update(
    {_id: req.body.id},
    req.body,
    {upsert: true},
    (err) => {
      if(err) console.log('there was an error updating')
      else console.log("updated todo")
    }
  );
}

const getOneSound = (req, res) => {
  Sound.findById(req.params.id, (err, data) => {
    res.send(data);
  })
};

//configure router for get and post calls
router.route('/:id')
  .get(getOneSound)

router.route('/')
  .get(getSound)
  .post(createSound)
  .delete(deleteSound)
  .put(updateSound)

module.exports = router;
