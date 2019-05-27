const express = require('express');

const router = express.Router();

const Project = require('../models/Project');
const {isLoggedIn} = require('../helpers/middlewares');


//prints all projects
router.get('/',isLoggedIn(), (req, res, next)=>{
  Project.find({})
    .populate('owner')
    .populate('contributors')
    .then((response)=> {res.json(response); console.log("response:", response)})
    .catch((err) => console.log(err))
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
  Project.findByIdAndRemove(id)
    .then((response) => res.json(response))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
})

 //edit specific project
 router.put('/:_id/editProject',isLoggedIn(), (req, res, next) => {
  const { _id } = req.params;
  const {projectname, description} = req.body;
  Project.findByIdAndUpdate(_id,{$set: {description, projectname}},{new:true})
    .then((data) => res.json(data))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
 })

 router.put('/:_idProject/contributors',isLoggedIn(), (req, res, next) => {
  const { _idProject } = req.params;
  const _idUser = req.session.currentUser._id;
  Project.findByIdAndUpdate(_idProject,{$push: {contributors: _idUser}},{new:true})
    .then((data) => {
      res.json(data)
      Project.find({})
      .then((data)=>{
        res.json(data)
      })
      .catch(()=>{
        res
          .status(500)
          .send()
      })
    })
    .catch(()=>{
      res
        .status(500)
        .send()
    })
 })

module.exports = router;