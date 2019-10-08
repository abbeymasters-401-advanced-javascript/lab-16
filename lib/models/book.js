const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindAuthors = {
  $unwind: {
    path: '$authors',
  }
};

const groupAuthors = {
  $group: {
    _id: '$authors',
    pageCount: {
      $avg: '$pageCount'
    }
  }
};

schema.static('book', function() {
  const pipeline = [
    unwindAuthors,
    groupAuthors
  ];
  return this.aggregate(pipeline);
});


module.exports = mongoose.model('Book', schema);