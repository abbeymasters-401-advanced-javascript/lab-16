const router = require('express').Router();
const Student = require('../models/student');

router
  .get('/students', (req, res, next) => {

    Student.students()
      .then(states => res.json(states))
      .catch(next);
  });


module.exports = router;