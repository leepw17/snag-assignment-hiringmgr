const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Question = require('../models/question');

/* ---------
  GET API ROUTES
  ----------- */
// Get all active questions
router.get('/getActiveQuestions', (req, res, next) => {
  Question.getActiveQuestions( (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to get active questions.' });
    }
    else{
      res.json({ success: true, questions: item });
    }
  });
});

// Get question by id
router.get('/:id', (req, res, next) => {
  Question.getQuestionById(req.params.id, (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to get question by id.' });
    }
    else{
      res.json({ success: true, question: item });
    }
  });
})

/* ---------
  POST API ROUTES
  ----------- */

// Add new question
router.post('/add', (req, res, next) => {
  let newQuestion = new Question({
    question: req.body.question,
    //answer: req.body.answer,
    choices: req.body.choices,
    status: req.body.status
  });

  Question.addQuestion(newQuestion, (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to create new question.' });
    } else{
      res.json({ success: true, msg: 'Question added successfully.' });
    }
  });
});

// Update question
router.post('/update', (req, res, next) => {
  let id = req.body._id;

  let updatedQuestion = new Question({
    question: req.body.question,
    //answer: req.body.answer,
    choices: req.body.choices,
    status: req.body.status
  });

  Question.updateQuestion(id, updatedQuestion, (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to update question.' });
    }
    else{
      res.json({ success: true, msg: 'Question updated successfully.' });
    }
  });
})

module.exports = router;
