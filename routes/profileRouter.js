const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Project = require('../models/Project');
const {isLoggedIn} = require('../helpers/middlewares');


// prints currentUser profile
router.get('/:_id',isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findOne({_id})
    .then((response) => res.json(response))
    .catch((err)=>{
      res
        .status(500)
        .send(err)
    })
})

//prints another users profile 
router.get('/:_id',isLoggedIn(), (req, res, next) => {
  const { _id } = req.params;
  User.findOne({_id})
    .then((response) => res.json(response))
    .catch((err)=>{
      res
        .status(500)
        .send(err)
    })
})

// adds one project to currentUser
 router.post('/:_id/addProject',isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  const {projectname} = req.body;
  const newProj = new Project({
    projectname,
  })
  let makeProject = newProj.save();
  let updateUser = User.findByIdAndUpdate(_id,{$push: {projects: newProj._id}})

  Promise.all([makeProject, updateUser])
    .then((data)=>res.json(data))
    .catch((err) => console.log(err))
   
  // const newProj = Project.create({owner: {_id}, projectname})
//     .then((response)=> res.json(response))
//     .catch(()=> res.send())
//   console.log(newProj)
//   User.findByIdAndUpdate(_id, {$push: {projects: [{newProj}]}},{new:true})
//     .then((response)=>{
//       console.log("here")
//       console.log(newProj)
//       res
//         .status(200)
//         .json(response)
//     })
//     .catch(() => {
//       res.send()
//     })
  })

//updates currentUsers profile
 router.put('/:_id',isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  const {description, uploads} = req.body;
  User.findOneAndUpdate({_id},{$set: {profile: {description, uploads}}},{new:true})
    .then((data) => res.json(data))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
 })


//deletes currentUsers Account
router.delete('/:_id',isLoggedIn(), (req,res,next)=>{
  const {_id} = req.session.currentUser
  User.findByIdAndRemove({_id})
    .then(() => {
      res.json({message: 'deleted successfully'})
      req.session.destroy();
    })
    .catch(()=> {
      res
        .status(500)
        .send()
    })
})



module.exports = router;