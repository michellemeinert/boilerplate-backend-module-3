const express = require('express');

const router = express.Router();

const User = require('../models/User');
const Project = require('../models/Project');
const {isLoggedIn} = require('../helpers/middlewares');
const parser = require('../config-cloudinary/cloudinary');


// prints currentUser profile
router.get('/',isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  User.findOne({_id})
    .then((response) => res.json(response))
    .catch((err)=>{
      res
        .status(500)
        .send(err)
    })
})

//  router.get('/projects', isLoggedIn(), (req, res, next) => {
//    const { _id } = req.session.currentUser;
//    User.find({_id, projects: 1})
//      .then((response) => res.json(response))
//      .catch((err)=>{
//        res
//          .status(500)
//          .send(err)
//      })
//  })

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
 router.post('/addProject',isLoggedIn(), (req, res, next) => {
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
  })

//updates currentUsers profile
 router.put('/edit',isLoggedIn(), (req, res, next) => {
  const { _id } = req.session.currentUser;
  const {description, occupation, imgUrl} = req.body;
  User.findOneAndUpdate({_id},{$set: {description, occupation}},{new:true})
    .then((data) => res.json(data))
    .catch(()=>{
      res
        .status(500)
        .send()
    })
 })

 router.post('/image',isLoggedIn(), parser.single('photo'), (req, res, next) => {
  console.log('file upload');
  if (!req.file) {
    next(new Error('No file uploaded!'));
  };
  const imgUrl = req.file.secure_url;
  User.findOneAndUpdate({_id},{$set: {imgUrl}},{new:true})
  res.json(imgUrl).status(200);
});


//deletes currentUsers Account
router.delete('/',isLoggedIn(), (req,res,next)=>{
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