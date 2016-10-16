var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfessionSchema = new Schema({
  id: Number,
  name: {
    type: String,
    default: "Anon"
  },
  message: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

var Confession = mongoose.model('confession', ConfessionSchema);

module.exports = Confession;
