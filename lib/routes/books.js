const router = require('express').Router();
const Book = require('../models/book');

router
  .get('/book', (req, res, next) => {
    Book.book()
      .then(book => res.json(book))
      .catch(next);
  });

module.exports = router;