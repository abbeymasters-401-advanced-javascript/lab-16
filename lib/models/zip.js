const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema();

const groupByState = {
  $group: {
    _id: '$state',
    count: {
      $sum: '$pop'
    }
  }
};

const sortByPop = {
  $sort: {
    count: -1
  }
};

const limitByTen = {
  $limit: 10
};

schema.static('population', function() {
  const pipeline = [
    groupByState,
    sortByPop,
    limitByTen
  ];

  return this.aggregate(pipeline);
});


module.exports = mongoose.model('Zips', schema);