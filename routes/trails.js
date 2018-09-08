var express = require('express');
var router = express.Router();
const Trails = require('../models/trails');

/* POST trail listing. */
router.post('/', (req, res, next) => {
    let newTrail = Trails(
      {
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        rating: req.body.rating,
        activity: req.body.activity
      }
    );
    newTrail.save()
    .then(trail => {
      res.json(trail)
    })
    .catch (err => {
      res.status(500).send(err)
    })
});

/* GET trail listing. */
router.get('/', (req, res, next) => {
  Trails.find()
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    res.status(500).send(err)
  })
})
  
  module.exports = router;