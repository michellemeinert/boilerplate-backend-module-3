const express = require('express');

const router = express.Router();

const Project = require('../models/Project');
const {isLoggedIn} = require('../helpers/middlewares');


//prints all projects
router.get('/',isLoggedIn(), (req, res, next)=>{
  Project.find()
    .then((response)=> res.json(response))
})

//prints one projects
router.get('/:_id',isLoggedIn(), (req, res, next)=>{
  const {_id} = req.params;
  Project.findById({_id})
    .then((response) => res.json(response))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
})

//deletes one project by currentUser
router.delete('/:id',isLoggedIn(), (req, res, next)=>{
  const {id} = req.params;
  Project.findOneAndRemove({id})
    .then((response) => res.json(response))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
})



module.exports = router;