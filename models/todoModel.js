const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  due: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['pendding', 'progress', 'inactive'],
    required: true
  }
});

const Todo = mongoose.model('todo', TodoSchema);
module.exports = Todo;