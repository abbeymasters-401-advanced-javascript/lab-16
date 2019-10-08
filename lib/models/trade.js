const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const projectHour = {
  $project: {
    hour: { $hour: '$time' },
    shares: '$shares'
  }
};

const groupByHour = {
  $group: {
    _id: '$hour',
    count: {
      $sum: '$shares'
    }
  }
};

schema.static('trade', function() {
  const pipeline = [
    projectHour,
    groupByHour
  ];
  return this.aggregate(pipeline);
});

module.exports = mongoose.model('Trades', schema);