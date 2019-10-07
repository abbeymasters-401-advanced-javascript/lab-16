const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const unwindScores = {
  $unwind: {
    path: '$scores'
  }
};

const projectInfo = {
  $project: {
    class: '$class_id',
    type: '$scores.type',
    score: '$scores.score',
  }
};

const groupScores = {
  $group: {
    _id:
    {
      class: '$class',
      type: '$type'
    },
    avgScore: {
      $avg: '$score'
    }
  }
};

const sortTypes = {
  $sort: {
    '_id.class': 1
  }, $project: {
    _id: 0,
    class: '$_id.class',
    type: '$_id.type',
    avgScore: '$avgScore'
  }
};

schema.static('grades', function() {
  const pipeline = [
    sortTypes,
    groupScores,
    projectInfo,
    unwindScores
  ];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Grades', schema);