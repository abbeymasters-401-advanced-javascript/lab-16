const router = require('express').Router();
const Trade = require('../models/trade');

router
  .get('/trade', (req, res, next) => {
    Trade.trade()
      .then(trade => res.json(trade))
      .catch(next);
  });

module.exports = router;