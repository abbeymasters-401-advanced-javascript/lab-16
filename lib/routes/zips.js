const router = require('express').Router();
const Zip = require('../models/zip');


router
  .get('/population', (req, res, next) => {
    
    Zip.population()
      .then(states => res.json(states))
      .catch(next);
  });

module.exports = router;