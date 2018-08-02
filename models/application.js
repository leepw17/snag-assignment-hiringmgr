const mongoose = require('mongoose');
const config = require('../config/database');

// Application Schema
const ApplicationSchema = mongoose.Schema({
  name: { type: String },
  answers: [{
    questionId: String,
    answer: String,
    correct: Boolean
  }],
  accepted: { type: Boolean }
});

const Application = module.exports = mongoose.model("Application", ApplicationSchema);

module.exports.addApplication = function(newApplication, callback){
  newApplication.save(callback);
}

module.exports.getApplicationById = function(id, callback){
  Application.findOne({ _id: id }, callback);
}

module.exports.getAccepted = function(callback){
  const query = { 'accepted': true };
  Application.find(query, callback);
}

module.exports.getRejected = function(callback){
  const query = { 'accepted': false };
  Application.find(query, callback);
}
