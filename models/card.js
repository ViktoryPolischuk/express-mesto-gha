const mongoose = require('mongoose');
const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: (url) => validator.isURL(url, {
      protocols: ['http', 'https'],
      require_protocol: true,
    }),
  },
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
