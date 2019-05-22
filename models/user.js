const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  projects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project'
  }],
  occupation: String,
  profile: {
    description: String,
    uploads: String
  }
// }, {
//   timestamps: {
//     createdAt: 'created_at',
//     updatedAt: 'updated_at'
//   },
});

const User = mongoose.model('User', userSchema);

module.exports = User;