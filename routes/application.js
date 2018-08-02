const express = require('express');
const router = express.Router();
const config = require('../config/database');

const Application = require('../models/application');

/* ---------
  GET API ROUTES
  ----------- */
// Get accepted applications
router.get('/getAccepted', (req, res, next) => {
  Application.getAccepted( (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to get accepted applications.' });
    }
    else{
      res.json({ success: true, applications: item });
    }
  })
})

// Get rejected applications
router.get('/getRejected', (req, res, next) => {
  Application.getRejected( (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to get rejected applications.' });
    }
    else{
      res.json({ success: true, applications: item });
    }
  })
})

// Get application by id
router.get('/:id', (req, res, next) => {
  Application.getApplicationById(req.params.id, (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to get application by id.' });
    }
    else{
      res.json({ success: true, application: item });
    }
  })
})

/* ---------
  POST API ROUTES
  ----------- */
// Add new application
router.post('/add', (req, res, next) => {
  let newApplication = new Application({
    name: req.body.name,
    answers: req.body.answers,
    accepted: req.body.accepted
  });

  Application.addApplication(newApplication, (err, item) => {
    if(err){
      res.json({ success: false, msg: 'Failed to add application.' });
    } else{
      res.json({ success: true, msg: 'Application added successfully.' });
    }
  });
});

module.exports = router;
