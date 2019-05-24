const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  projectname: String,
  description: String
  //contributors: userSchema,
  //looking_for: String,

});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;