const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const breakDownArray = {
  $unwind: {
    path: '$scores'
  }
};

const groupByScoreType = {
  $group: {
    _id: '$scores.type',
    minScore: {
      $min: '$scores.score'
    },
    maxScore: {
      $max: '$scores.score'
    },
    avgScore: {
      $avg: '$scores.score'
    }
  }
};

schema.static('students', function() {
  const pipeline = [
    breakDownArray,
    groupByScoreType
  ];
  return this.aggregate(pipeline);
});


module.exports = mongoose.model('Students', schema);