const express = require('express');
const router = express.Router();
const Task = require('../models/task');

router.get('/', (req, res) => {
  Task.find( (err, tasks) => { res.send(tasks); });
});

router.post('/', (req, res) => {
  let { title } = req.body;
  new Task({ title }).save( ( err, task ) => { res.send(task); });
});

router.post('/task_template', (req, res) => {
  let { id, title, complete } = req.body;
   res.render('task', { id, title, complete });
});

router.put('/:id', (req, res) => {
  Task.findByIdAndUpdate(
  req.params.id,
  { $set: { complete: req.body.complete }},
  (err, task) => {
    res.send(task);
  });
});

router.delete('/:id', (req, res) => {
 Task.findById(req.params.id, (err, task) => {
   task.remove();
   res.status(200).send({success: true});
  });
});

module.exports = router;