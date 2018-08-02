const mongoose = require('mongoose');
const config = require('../config/database');

// Question Schema
const QuestionSchema = mongoose.Schema({
  question: { type: String },
  choices: [{ text: String, answer: Boolean }],
  status: { type: String }
})

const Question = module.exports = mongoose.model("Question", QuestionSchema);

module.exports.addQuestion = function(newQuestion, callback){
  newQuestion.save(callback);
}

module.exports.getQuestionById = function(id, callback){
  Question.findOne({ _id: id }, callback);
}

module.exports.getActiveQuestions = function(callback){
  const query = { 'status': 'Active' };
  Question.find(query, callback);
}

module.exports.updateQuestion = function(id, updatedQuestion, callback){
  Question.update({ _id: id }, {
      question: updatedQuestion.question,
      choices: updatedQuestion.choices,
      status: updatedQuestion.status
    }, callback);
}
