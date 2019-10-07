const router = require('express').Router();
const Grade = require('../models/grade');

router
  .get('/grades', (req, res, next) => {
    Grade.grades()
      .then(grade => res.json(grade))
      .catch(next);
  });




module.exports = router;