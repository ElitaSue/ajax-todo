const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const Task = new Schema({
  title:     { type: String, required: true },
  complete:  { type: Boolean, default: false }
});

module.exports = mongoose.model( 'Task', Task );