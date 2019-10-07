const router = require('express').Router();
const Grade = require('../models/grade');

router
  .get('/grade', (req, res, next) => {
    Grade.grade()
      .then(grade => res.json(grade))
      .catch(next);
  });

module.exports = router;